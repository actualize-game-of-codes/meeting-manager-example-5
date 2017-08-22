/* global Vue, $ */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      meetings: [],
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: false,
      newMeetingName: "",
      newMeetingAddress: "",
      newMeetingStartTime: "",
      newMeetingEndTime: "",
      newMeetingNotes: ""
    },
    mounted: function() {
      $.ajax({
        url: "/api/v1/meetings",
        type: "GET",
        success: function(response) {
          console.log(response);
          this.meetings = response;

          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 1
          });
          var geocoder = new google.maps.Geocoder();
          this.meetings.forEach(function(meeting) {
            console.log('the address is', meeting.address, meeting);
            geocodeAddress(geocoder, map, meeting.address);
          });
        }.bind(this)
      });
    },
    methods: {
      isValidMeeting: function(inputMeeting) {
        return inputMeeting.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
      },
      changeSortAttribute: function(inputSortAttribute) {
        this.sortAttribute = inputSortAttribute;
      },
      createMeeting: function() {
        $.ajax({
          url: "/api/v1/meetings",
          type: "POST",
          data: `name=${this.newMeetingName}&address=${this.newMeetingAddress}`,
          success: function(response) {
            this.meetings.push(response);
          }.bind(this)
        });
      }
    },
    computed: {
      modifiedMeetings: function() {
        return this.meetings.sort(function(a, b) {
          if (this.sortAscending) {
            return a[this.sortAttribute] > b[this.sortAttribute];
          } else {
            return a[this.sortAttribute] < b[this.sortAttribute];
          }
        }.bind(this));
      }
    }
  });
});

function geocodeAddress(geocoder, resultsMap, address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
