import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Period } from '@iapps/period-utilities';
import { addDays, differenceInDays, format, max, min } from 'date-fns';
import { flatten, omit } from 'lodash';
import moment from 'moment';
import { Observable, map, of, switchMap } from 'rxjs';
import { Task } from '../models';
@Injectable()
export class TaskService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  get(): Observable<Task[]> {
    return this.httpClient
      .get('me.json?fields=organisationUnits[id,name,level],dataSets')
      .pipe(
        switchMap((user: any) => {
          const dataEntryOrgUnits: string[] = (
            user.organisationUnits || []
          ).map((orgUnit: any) => orgUnit.id);

          const userDataSets = user.dataSets || [];

          if (dataEntryOrgUnits.length === 0 || userDataSets.length === 0) {
            return of([]);
          }

          return this.httpClient
            .get(
              `dataSets?fields=id,name,periodType,timelyDays,expiryDays,openFuturePeriods,organisationUnits[id,name]&filter=id:in:[${userDataSets.join(
                ','
              )}]&filter=organisationUnits.id:in:[${dataEntryOrgUnits.join(
                ','
              )}]&filter=access.data.write:eq:true`
            )
            .pipe(
              switchMap((res: Record<string, Record<string, unknown>[]>) => {
                let startDates: Date[] = [];
                let endDates: Date[] = [];
                const dataSets = flatten(
                  (res['dataSets'] || [])
                    .map((dataSet) => {
                      const latestEntryPeriod = this.#getPeriod(
                        dataSet['periodType'] as string,
                        dataSet['openFuturePeriod'] as number
                      );

                      if (!latestEntryPeriod || !latestEntryPeriod.endDate) {
                        return null;
                      }

                      const entryStartDate = this.#getEntryStartDate(
                        latestEntryPeriod.endDate
                      );

                      const isEntryOpen =
                        differenceInDays(new Date(), entryStartDate) >= 0;

                      if (!isEntryOpen) {
                        return null;
                      }

                      const entryDueDate = this.#getEntryDueDate(
                        entryStartDate,
                        dataSet['timelyDays'] as number
                      );

                      if (latestEntryPeriod?.startDate) {
                        startDates = [
                          ...startDates,
                          this.#getDate(latestEntryPeriod.startDate),
                        ];
                      }

                      if (latestEntryPeriod?.endDate) {
                        endDates = [
                          ...endDates,
                          this.#getDate(latestEntryPeriod.endDate),
                        ];
                      }

                      return ((dataSet['organisationUnits'] as any[]) || [])
                        .filter((dataSetOrgUnit) =>
                          dataEntryOrgUnits.includes(dataSetOrgUnit.id)
                        )
                        .map((dataSetOrgUnit) => {
                          return omit(
                            {
                              ...dataSet,
                              entryPeriod: latestEntryPeriod,
                              entryStartDate,
                              entryDueDate,
                              orgUnit: dataSetOrgUnit,
                            },
                            'organisationUnits'
                          );
                        });
                    })
                    .filter((task) => task)
                );

                const minStartDate = format(min(startDates), 'yyyy-MM-dd');
                const maxEndDate = format(max(endDates), 'yyyy-MM-dd');

                return this.httpClient
                  .get(
                    `completeDataSetRegistrations.json?${dataSets
                      .map((dataSet: any) => `dataSet=${dataSet.id}`)
                      .join(
                        '&'
                      )}&startDate=${minStartDate}&endDate=${maxEndDate}&${dataEntryOrgUnits.map(
                      (orgUnit) => `orgUnit=${orgUnit}`
                    )}`
                  )
                  .pipe(
                    map((completenessResponse: Record<string, unknown>) => {
                      const completeRegistrations =
                        (completenessResponse[
                          'completeDataSetRegistrations'
                        ] as Record<string, any>[]) || [];

                      return dataSets
                        .map((dataSet: any) => {
                          const completeRegistration: any =
                            completeRegistrations.find(
                              (completeness: any) =>
                                completeness?.period ===
                                  dataSet.entryPeriod?.id &&
                                completeness?.dataSet === dataSet.id &&
                                completeness?.organisationUnit ===
                                  dataSet.orgUnit?.id
                            );

                          if (
                            completeRegistration?.completed &&
                            differenceInDays(new Date(), dataSet.entryDueDate) >
                              0
                          ) {
                            return null;
                          }

                          return new Task({
                            ...dataSet,
                            completed: completeRegistration?.completed,
                            completedDate: completeRegistration?.date,
                          });
                        })
                        .filter((task) => task) as Task[];
                    })
                  );
              })
            );
        })
      );
  }

  #getDate(dateString: string) {
    const date = moment(dateString);

    if (!date.isValid()) {
      return moment(dateString, 'DD-MM-YYYY').toDate();
    }

    return date.toDate();
  }

  #getEntryStartDate(formEndDate: string) {
    const date = moment(formEndDate);

    if (!date.isValid()) {
      return addDays(moment(formEndDate, 'DD-MM-YYYY').toDate(), 1);
    }

    return addDays(moment(formEndDate).toDate(), 1);
  }

  #getEntryDueDate(entryStartDate: Date, timelyDays: number) {
    if (timelyDays === 0) {
      return null;
    }

    return addDays(entryStartDate, timelyDays);
  }
//   #getEntryDueDate(entryStartDate: Date, timelyDays: number) {
//     if (timelyDays === 0) {
//       return null;
//     }

//     const dueDate = addDays(entryStartDate, timelyDays);

//     if (dueDate < new Date()) {
//       console.log("testing the validation issue here if it works correctly....");
//     }

//     return dueDate;
// }


  #getPeriod(periodType: string, openFuturePeriods: number) {
    try {
      return new Period()
        .setPreferences({
          openFuturePeriods,
        })
        .setType(periodType)
        .get()
        .list()[0];
    } catch (e) {
      return null;
    }
  }
}
