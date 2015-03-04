package com.vitunterwegs.vit_app;

import android.app.Activity;
import android.webkit.WebView;
import android.webkit.*;

public class WebViewClientImpl extends WebViewClient {

    private Activity activity = null;

    public WebViewClientImpl(Activity activity) {
        this.activity = activity;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView webView, String url) {

        return false;
    }



}
