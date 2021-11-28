// import Axios from 'axios';
// import { log, logCatch } from '@/utils/message';
// import { axiosThen } from '@/utils/net';
import * as types from './types';
// import getTDXHeader from '@/utils/tdx';
// const jsonV1 = require('@/utils/data_v1.json');
// const jsonV2 = require('@/utils/data_v2.json');

/** *** Store current user information  */
export default {
  strict: true,        // option 嚴格模式
  namespaced: true,    // option
  state: {
    city_routes: {},
  },
  actions: {
    getCityRoutes(context, payload) {
      return new Promise((resolve, reject) => {
        // const tdxHeader = getTDXHeader();
        const config = {
          method: 'get',
          url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/?$format=JSON&',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: tdxHeader.Authorization,
            // 'X-Date': tdxHeader['X-Date'],
          },
        };

        if (payload.city) {
          if (context.state.city_routes[payload.city]) {
            // this city routes is downloaded, skip
            resolve();
            return;
          }
          config.url += `${payload.city}?$format=JSON&`;
        }
        else {
          reject();
          return;
        }

        context.dispatch('startLoading', '取得站點列表中...', { root: true });
        setTimeout(() => {
          context.dispatch('endLoading', null, { root: true });
        }, 5000);
        // Axios(config).then((response) => {
        //   console.log('/v2/Bike/Station/NearBy', response);
        //   axiosThen(response, () => {
        //     // success
        //     log('取得站點列表成功');
        //     context.commit(types.bus.SET_CITY, response.data);
        //     context.dispatch('getBikeAvailabilities', payload).then(() => {}).catch((msg) => log(msg, true, false, false, true));
        //     resolve();
        //   }, () => {
        //     // failure
        //     log(`取得站點列表失敗: ${response.data.message}`, true, false, false, true);
        //     reject();
        //   }, () => {
        //     // no response
        //     log('取得站點列表失敗: 未收到伺服器回應。', true, false, false, true);
        //     reject();
        //   });
        // }).catch((error) => {
        //   logCatch('取得站點列表失敗: ', error);
        //   reject();
        // }).finally(() => {
        //   context.dispatch('endLoading', null, { root: true });
        // });
      });
    },
  },
  mutations: {
    [types.bus.SET_CITY](state, stations) {
      state.bike_stations_tmp = {};
      stations.forEach((station) => {
        state.bike_stations_tmp[station.StationUID] = { ...station };
      });
    },
  },
  getters: {
    bikeStationsTmp(state) { return state.bike_stations_tmp; },
    bikeStationsV1(state) { return state.bike_stations_v1; },
    bikeStationsV2(state) { return state.bike_stations_v2; },
  },
};
