package com.vitunterwegs.vit_app;

import android.app.Activity;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Anzeige Bereich für die Website
        WebView webView = (WebView)
                findViewById(R.id.webview);

        // Javascript ermöglichen
        webView.getSettings().setJavaScriptEnabled(true);

        // WebViewClient, damit die Navigation in der WebView bleibt
        WebViewClientImpl webViewClient = new WebViewClientImpl(this);
        webView.setWebViewClient(webViewClient);

        // Anzeige der Website
        webView.loadUrl("http://mathias-foehrenbacher.de/VIT/index.html");
    }
}


