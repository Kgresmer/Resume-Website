'use strict';

angular.module('mainPage.version', [
  'mainPage.version.interpolate-filter',
  'mainPage.version.version-directive'
])

.value('version', '0.1');
