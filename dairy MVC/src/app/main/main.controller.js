export class MainController {
  constructor($timeout, moment, $log, localStorageService, _) {
    'ngInject';

    let vm = this;
    let i;

    vm.thisYear = moment(new Date).format('YYYY');
    vm.week = createWeek(); // works only once: when init
    // vm.day = createEvents();

    vm.prev = prevWeek;
    vm.next = nextWeek;
    vm.addEvent = addEvent;
    vm.saveEvent = saveEvent;

    vm.isPopup = false;

    function saveEvent(event) {
      const submitLink = event.target.dataset,
        key = submitLink.dateKey,
        time = submitLink.hourKey,
        eventText = document.body.querySelector('textarea').value;

      let eventData = JSON.parse(localStorageService.get(key)) || [];

      eventData.push({
        hour: time,
        event: eventText
      });

      $log.warn(eventData);

      if (eventText) {
        localStorageService.set(key, JSON.stringify(eventData));
      }

      vm.isPopup = false;
    }


    function addEvent(event) {
      const parent = event.delegateTarget.parentNode.parentNode;
      $log.log(parent);
      $log.info(event);

      vm.popupReferers = {
        setHour: event.currentTarget.dataset.hourKey,
        setDate: parent.dataset.dayKey,
        showTime: this.setHour,
        showDate: moment(this.setDate).format('dddd M')
      }

      vm.isPopup = true;
    }


    function nextWeek() {
      let week = [];
      for (let j = i; j < 7 + i; j++) {
        week.push(fillWeekWithDays(j))
      }
      returnThisYear(7, 1);

      return vm.week = week
    }


    function prevWeek() {
      let week = [];
      for (let k = i - 14; k < i - 7; k++) {
        week.push(fillWeekWithDays(k))
      }
      returnThisYear(7, -1);

      return vm.week = week
    }


    function createEvents(dateKey) {
      let events = JSON.parse(localStorageService.get(dateKey)) || [];

      $log.debug("day ", events);

      if (events.length) {
        for (let i = 0; i < 11; i++) {

          //let all = [];
/*            all.push(
              Promise.resolve((function () {
                return !(events.hour === (8 + i) + ":00")
              })(i))
            );


          Promise.all(all).then((a) => {
            $log.warn(a);
          });*/

          events.push({
            hour: (8 + i) + ":00",
            event: "" // тут будем делат localstorage get indexof и заполнять поле event
          })

          var uniqueList = _.uniq(events, function(item, key, a) {
            return item.a;
          });

          $log.info(uniqueList);
        }


      }
      return events
    }


    function createWeek() {
      let week = [];

      for (i = 0; i < 7; i++) {
        week.push(fillWeekWithDays(i))
      }
      return week
    }


    function fillWeekWithDays(x) {
      let day = moment(new Date).add(x, 'days');

      const obj = {
        day: day.format('dddd'),
        date: day.format('MMMM Do'),
        key: day.format('DDMMYYYY'),
        events: createEvents(day.format('DDMMYYYY'))
      };

      //$log.debug(obj);

      return obj
    }


    function returnThisYear(y, z) {
      i += y * z;
      vm.thisYear = moment(new Date).add(i - y, 'days').format('YYYY');
    }

    /*    function previousWeek(){
     (function(){
     var
     }())
     }*/
//  $timeout(() => {
//    this.classAnimation = 'rubberBand';
//  }, 4000);
//}
//$log.log("I'm using $log.log")
//$log.warn("I'm using $log.warn")
// $log.error("I'm using $log.error")
//$log.info("I'm using $log.info")
  }
}
