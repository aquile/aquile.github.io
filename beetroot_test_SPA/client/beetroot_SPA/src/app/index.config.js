export function config (localStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider
    .setPrefix('')
    .setNotify(true, true)
    .setStorageType("localStorage"); // 'sessionStorage'

}
