export class MainController {
  constructor($timeout, webDevTec, toastr, moment, $log) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1458157163258;
    this.toastr = toastr;
//--------------------------//--------------------------
    $timeout(() => {
      this.week = createWeek();
      $log.log(this.week);
    });

    //this.prev = previousWeek();

    $log.log(this.week);

    this.activate($timeout, webDevTec);


    function createWeek() {
      let week = [];

      for (var i = 0; i < 7; i++) {
        week.push({date: moment(new Date).add(i, 'days').format('dddd [/] MMMM Do YYYY')});
      }

      return week;
    }

/*    function previousWeek(){
      (function(){
        var
      }())
    }*/
  }


  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
