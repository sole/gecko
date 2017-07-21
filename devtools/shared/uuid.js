/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const { Cc, Ci, components: { ID: parseUUID } } = require("chrome");
const { generateUUID } =
	Cc["@mozilla.org/uuid-generator;1"].getService(Ci.nsIUUIDGenerator);

/**
 * Returns `uuid`. If `id` is passed then it's parsed to `uuid` and returned
 * if not then new one is generated.
 *
 * Replacement for `uuid` API from "sdk/util/uuid".
 */
exports.uuid = function uuid(id) {
  return id ? parseUUID(id) : generateUUID();
};
