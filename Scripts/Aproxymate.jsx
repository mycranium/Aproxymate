{
    app.beginUndoGroup("Replace Source with Proxy"); // Create an undo groupvar myCollection = app.project.items;
    if (myCollection.length > 0) {
        for (i = 1; i <= myCollection.length; i++) {
            if (myCollection[i].proxySource) {
                if (myCollection[i].useProxy) {
                    var srcFps = myCollection[i].frameRate.toFixed(2);
                    var prxFile = myCollection[i].proxySource.file;
                    myCollection[i].replace(prxFile);
                    myCollection[i].setProxyToNone();
                    myCollection[i].mainSource.conformFrameRate = srcFps;
                }
            }
        }
    }
    // close the undo group
    app.endUndoGroup();
}

