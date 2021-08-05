import { HttpClient, HttpClientModule } from '@angular/common/http';
import { normalize } from 'normalizr';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const REQUEST_READ_USER = 'REQUEST_READ_USER';
export const SUCCESS_READ_USER = 'SUCCESS_READ_USER';
export const FAIL_READ_USER = 'FAIL_READ_USER';

export class actions {
  //   readUser = (id) => (dispatch) => {
  //     dispatch({ type: REQUEST_READ_USER });
  //     return axios
  //       .get('http://localhost:3004/credit-card-details')
  //       .then((payload) => payload.json())
  //       .then((payload) => {
  //         dispatch({ type: SUCCESS_READ_USER, payload });
  //       });
  //   };
  constructor(public httpClient: HttpClient) {}

  readEntity = (entityName, id) => ({
    type: `REQUEST _READ_${entityName.toUppercase()}`,
    urlParams: { entityName, id },
    meta: {
      identifier: id,
      entityName,
    },
  });

  apiMiddleWare = (store) => (next) => (action) => {
    if (action.type.startsWith('REQUEST_READ')) {
      const { entityName, id } = action.urlParams;
      this.httpClient
        .get(`/${entityName}/${id}`)
        .toPromise()
        .then((payload) => JSON.stringify(payload))
        .then((payload) => {
          store.dispatch({
            ...action,
            payload: normalize(action.payload, action.meta.entityName),
          });
        });
    } else {
      next(action);
    }
  };
}
