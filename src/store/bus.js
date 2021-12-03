import Axios from 'axios';
import { log, logCatch } from '@/utils/message';
import { axiosThen } from '@/utils/net';
import * as types from './types';
import getTDXHeader from '@/utils/tdx';

/** *** Store current user information  */
export default {
  strict: true,        // option 嚴格模式
  namespaced: true,    // option
  state: {
    city_routes: {},
    current_route: null,
  },
  actions: {
    /**
     * static data
     */
    getCityRoutes(context, payload) {
      return new Promise((resolve, reject) => {
        const tdxHeader = getTDXHeader();
        const config = {
          method: 'get',
          url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: tdxHeader.Authorization,
            'X-Date': tdxHeader['X-Date'],
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

        context.dispatch('startLoading', '取得路線列表中...', { root: true });
        Axios(config).then((response) => {
          console.log('/v2/Bus/Route/City', response);
          axiosThen(response, () => {
            // success
            log('取得路線列表成功');
            context.commit(types.bus.SET_CITY, { city: payload.city, routes: response.data });
            resolve();
          }, () => {
            // failure
            log(`取得路線列表失敗: ${response.data.message}`, true, false, false, true);
            reject();
          }, () => {
            // no response
            log('取得路線列表失敗: 未收到伺服器回應。', true, false, false, true);
            reject();
          });
        }).catch((error) => {
          logCatch('取得路線列表失敗: ', error);
          reject();
        }).finally(() => {
          context.dispatch('endLoading', null, { root: true });
        });
      });
    },
    setCurrentRoute(context, payload) {
      return new Promise((resolve, reject) => {
        if (!payload.city || !payload.routeUID) {
          reject();
          return;
        }

        if (context.state.city_routes[payload.city]) {
          // set current route
          context.commit(types.bus.SET_CURRENT_ROUTE, context.state.city_routes[payload.city][payload.routeUID]);
        }
        else {
          // get city routes and then set current route
          context.dispatch('getCityRoutes', payload).then(() => {
            if (context.state.city_routes[payload.city][payload.routeUID]) {
              context.commit(types.bus.SET_CURRENT_ROUTE, context.state.city_routes[payload.city][payload.routeUID]);
              resolve();
            }
            else {
              reject(new Error('該縣市查無此路線。'));
            }
          }).catch(() => {
            reject();
          });
        }
      });
    },

    /**
     * dynamic data
     */
  },
  mutations: {
    [types.bus.SET_CITY](state, payload) {
      if (!state.city_routes[payload.city]) {
        state.city_routes[payload.city] = {};
      }
      const cityBusRoutes = state.city_routes[payload.city];

      payload.routes.forEach((route) => {
        if (route.City !== payload.city) {
          console.log('city not match', route);
          return;
        }
        if (!route.RouteUID) {
          console.log('lose RouteUID', route);
          return;
        }
        // if (route.SubRoutes.length > 2) {
        //   console.log(`${route.SubRoutes.length} sub-route`, route);
        // }
        // if (!route.HasSubRoutes) {
        //   console.log('no sub-routes', route);
        // }

        const subRoutes = {};
        route.SubRoutes.forEach((subRoute) => {
          if (!subRoutes[subRoute.SubRouteUID]) {
            subRoutes[subRoute.SubRouteUID] = {};
          }
          subRoutes[subRoute.SubRouteUID][subRoute.Direction] = { ...subRoute };
        });
        cityBusRoutes[route.RouteUID] = { ...route };
        cityBusRoutes[route.RouteUID].SubRoutes2 = subRoutes;
      });
    },
    [types.bus.SET_CURRENT_ROUTE](state, route) {
      state.current_route = { ...route };
    },
  },
  getters: {
    searchedBusRoutes: (state) => (city, search) => {
      const cityBusRoutes = state.city_routes[city];
      if (cityBusRoutes) {
        const searchedRoutes = [];
        const routeUIDs = Object.keys(cityBusRoutes);
        
        // search
        routeUIDs.forEach((routeUID) => {
          const route = cityBusRoutes[routeUID];
          if (route.RouteName && route.RouteName.Zh_tw && route.RouteName.Zh_tw.includes(search)) {
            searchedRoutes.push(route);
          }
        });

        // sort
        searchedRoutes.sort((a, b) => {
          if (a.RouteName.Zh_tw < b.RouteName.Zh_tw) {
            return -1;
          }
          if (a.RouteName.Zh_tw > b.RouteName.Zh_tw) {
            return 1;
          }
          return 0;
        });

        return searchedRoutes;
      }
      return [];
    },
    curRoute(state) {
      return state.current_route;
    },
  },
};
