package com.vitunterwegs.vit_app;


import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.*;
import java.io.InputStream;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.widget.Toast;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;

public class WebViewClientImpl extends WebViewClient {

    private Activity activity = null;

    private boolean connected = true;

    int buffer = 0;

    public WebViewClientImpl(Activity activity) {
        this.activity = activity;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView webView, String url) {
        webView.loadUrl(url);
        return false;
    }

    @Override
    public void onPageFinished (WebView view, String url){

        if (connected == true) {
            // Webview einblenden
            activity.findViewById(R.id.webview).setVisibility(View.VISIBLE);
            // ProgressBar ausblenden
            activity.findViewById(R.id.splash_progressBar).setVisibility(View.INVISIBLE);
            // ProgressBar ausblenden
            activity.findViewById(R.id.splash_logo).setVisibility(View.INVISIBLE);
        }
    }

    public void onPageStarted (WebView view, String url, Bitmap favicon){
        connected = true;
    }

    public void onReceivedError (WebView view, int errorCode, String description, String failingURL){
        activity.findViewById(R.id.webview).setVisibility(View.INVISIBLE);
        connected = false;
        buffer += 1;
        if (buffer%100 == 0) {
            Toast.makeText(activity.getApplicationContext(),
                    "Bitte überprüfen sie ihre Internetverbindung" +" Times tried: " + buffer/75, Toast.LENGTH_SHORT).show();
        }
        view.reload();
    }



}