// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let spinner = document.getElementById('spinner');
      
      spinner.className="active";

      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'parseEvent.js'},
          async emptyPromise => {
              const message = new Promise(resolve => {
                  const listener = request => {
                      chrome.runtime.onMessage.removeListener(listener);
                      resolve(request);
                  };
                  chrome.runtime.onMessage.addListener(listener);
              });
              
              const result = await message;
              // alert(JSON.stringify(result));
              spinner.className="inactive";
              console.log(result); // Logs t
          });
  });
};
