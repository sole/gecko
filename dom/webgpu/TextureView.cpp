/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "TextureView.h"

#include "Device.h"
#include "mozilla/dom/WebGPUBinding.h"

namespace mozilla {
namespace webgpu {

TextureView::~TextureView() = default;

WEBGPU_IMPL_GOOP_0(TextureView)

} // namespace webgpu
} // namespace mozilla
