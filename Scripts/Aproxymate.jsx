{
    app.beginUndoGroup("Replace Source with Proxy"); // Create an undo groupvar myCollection = app.project.items;
    if (myCollection.length > 0) {
        //        alert(myCollection[6].mainSource.removePulldown.);
        for (i = 1; i <= myCollection.length; i++) {
            if (myCollection[i].proxySource) { // If an item has a proxySource attribute (that is, has a proxy set)
                if (myCollection[i].useProxy) { // If the proxy is active
                    var srcFps = myCollection[i].frameRate.toFixed(2); // get the interpreted framerate from the source (Main)
                    var prxFile = myCollection[i].proxySource.file; // Get the proxy source file reference
                    if (myCollection[i].typeName != "Composition") { // if it isn't a Composition
                        myCollection[i].replace(prxFile);
                        myCollection[i].setProxyToNone();
                        if (!myCollection[i].mainSource.isStill) { // If the source is not a still, set the proxy freamreat to match the Main interpreted fps
                            myCollection[i].mainSource.conformFrameRate = srcFps;
                        }
                    } else {
                        var myNew = myCollection[i].name;
                        var srcFile = new ImportOptions(prxFile);
                        var newLayer = app.project.importFile(srcFile);
                        var myOld = myCollection[i].name;
                        var myItems = app.project.items;
                        var itemCount = myItems.length; // get all comp items into array
                        var myComps = [];
                        for (n = 1; n < itemCount; n++) {
                            if (myItems[n].typeName == "Composition") {
                                myComps.push(myItems[n]);
                            }
                        }
                        var compCount = myComps.length;
                        for (c = 0; c < compCount; c++) { // in individual comp from comp array
                            var myLayersColl = myComps[c].layers;
                            var lCount = myLayersColl.length;
                            var myLayers = [];
                            for (l = 1; l <= lCount; l++) { // create layers array
                                if (myLayersColl[l].name == myOld) {
                                    myLayers.push(myLayersColl[l]);
                                }
                            }
                            var myL = myLayers.length;
                            for (m = 0; m < myL; m++) {
                                myLayers[m].replaceSource(newLayer, false);
                                myLayers[m].label = 11;
                            }
                        }
                        myCollection[i].setProxyToNone();
                    }
                }
            }
        }
    }
    // close the undo group
    app.endUndoGroup();
}