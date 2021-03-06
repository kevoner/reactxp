/**
* AccessibilityUtil.ts
*
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT license.
*
* Android-specific accessibility utils.
*/

import React = require('react');
import RN = require('react-native');

import Accessibility from '../native-common/Accessibility';
import { AccessibilityUtil as CommonAccessibilityUtil } from '../native-common/AccessibilityUtil';

export class AccessibilityUtil extends CommonAccessibilityUtil {
    private _sendAccessibilityEvent(component: React.Component<any, any>, eventId: number) {
        // See list of events here:
        // https://developer.android.com/reference/android/view/accessibility/AccessibilityEvent.html

        // For some reason, a small delay is required for the event to be properly processed.
        setTimeout(() => {
            RN.NativeModules.UIManager.sendAccessibilityEvent(
                RN.findNodeHandle(component),
                eventId);
            }, 100
        );
    }

    setAccessibilityFocus(component: React.Component<any, any>) {
        const TYPE_VIEW_FOCUSED = 8;

        if (Accessibility.isScreenReaderEnabled()) {
            this._sendAccessibilityEvent(component, TYPE_VIEW_FOCUSED);
        }
    }
}

export default new AccessibilityUtil();
