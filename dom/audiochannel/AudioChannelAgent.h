/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_dom_audio_channel_agent_h__
#define mozilla_dom_audio_channel_agent_h__

#include "nsIAudioChannelAgent.h"
#include "nsCycleCollectionParticipant.h"
#include "nsCOMPtr.h"
#include "nsIWeakReferenceUtils.h"

class nsPIDOMWindowInner;
class nsPIDOMWindowOuter;

namespace mozilla {
namespace dom {

class AudioPlaybackConfig;

/* Header file */
class AudioChannelAgent : public nsIAudioChannelAgent
{
public:
  NS_DECL_CYCLE_COLLECTING_ISUPPORTS
  NS_DECL_NSIAUDIOCHANNELAGENT

  NS_DECL_CYCLE_COLLECTION_CLASS(AudioChannelAgent)

  AudioChannelAgent();

  void WindowVolumeChanged();
  void WindowSuspendChanged(nsSuspendedTypes aSuspend);
  void WindowAudioCaptureChanged(uint64_t aInnerWindowID, bool aCapture);

  nsPIDOMWindowOuter* Window() const
  {
    return mWindow;
  }

  uint64_t WindowID() const;
  uint64_t InnerWindowID() const;

  bool IsPlayingStarted() const;
  bool ShouldBlockMedia() const;

private:
  virtual ~AudioChannelAgent();

  AudioPlaybackConfig GetMediaConfig();
  bool IsDisposableSuspend(nsSuspendedTypes aSuspend) const;

  // Returns mCallback if that's non-null, or otherwise tries to get an
  // nsIAudioChannelAgentCallback out of mWeakCallback.
  already_AddRefed<nsIAudioChannelAgentCallback> GetCallback();

  nsresult InitInternal(nsPIDOMWindowInner* aWindow,
                        nsIAudioChannelAgentCallback* aCallback,
                        bool aUseWeakRef);

  void Shutdown();

  nsresult FindCorrectWindow(nsPIDOMWindowInner* aWindow);

  nsCOMPtr<nsPIDOMWindowOuter> mWindow;
  nsCOMPtr<nsIAudioChannelAgentCallback> mCallback;

  nsWeakPtr mWeakCallback;

  uint64_t mInnerWindowID;
  bool mIsRegToService;
};

} // namespace dom
} // namespace mozilla


#endif
