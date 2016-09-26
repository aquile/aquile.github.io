export function config (localStorageServiceProvider) { //$logProvider, toastrConfig
  'ngInject';

  localStorageServiceProvider
    .setPrefix('')
    //.setStorageType('sessionStorage')
    .setNotify(true, true)
    .setStorageType("localStorage"); // 'sessionStorage'

  // Enable log
  //$logProvider.debugEnabled(true);

  // Set options third-party lib
/*  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;*/

/*  myApp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setStorageType('sessionStorage');
  });*/
}
