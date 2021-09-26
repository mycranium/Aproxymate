{
    app.beginUndoGroup("Comments"); // Create an undo groupvar myCollection = app.project.items;
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


    //var srcFile = new ImportOptions(testFile);
    //app.project.importFile(srcFile);
    //app.project.importFile(new ImportOptions(File(“sample.psd”))

//alert(myCollection.length);
// Project overhead
// get project items into collection
// iterate collection, get items into array if hasProxy
// if items,
// Prompt 1- delete originals Y/N
// Prompt 2 - Ignore items with disabled proxies
// item get type deletable (if type = footage false else true)
// get proxysource
// item proxyActive?
// if !Prompt 2 
    // source.replace(proxysource)
    // if item.deletable && Prompt 1
        // source.delete
// else
    // if item.active
        // source.replace(proxysource)
        // if item.deletable && Prompt 1
            // source.delete

