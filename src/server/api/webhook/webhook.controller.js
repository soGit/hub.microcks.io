/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

import updateService from '../../services/updateService.js';

const updateLocalMocks = function (req, res) {
  console.debug("-- Invoking the updateLocalMocks API using secret '" + req.params.secret + "'");

  // Update only if provided secret matches app configured one.
  var webhookSecret = req.app.get('webhookSecret');
  if (webhookSecret === req.params.secret) {
    updateService.updateLocalMocks(res, (success, err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      return res.status(200);
    });
  } else {
    return res.status(403).send('Bad authorization secret');
  }
};

export default { updateLocalMocks };