var BfsListViewRowClick = BfsListViewRowClick || {};

BfsListViewRowClick.addClassicMutationObserver = function () {
    var container = document;
    var observer = new MutationObserver(BfsListViewRowClick.addRowOnClickCheckboxEventHandlerWhenListViewRowsAdded);

    observer.observe(container, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
    });
}

BfsListViewRowClick.addLightningMutationObserver = function () {
    var container = document;
    var observer = new MutationObserver(BfsListViewRowClick.addLightningRowOnClickCheckboxEventHandlerWhenListViewRowsAdded);

    observer.observe(container, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false
    });
}

BfsListViewRowClick.addLightningRowOnClickCheckboxEventHandlerWhenListViewRowsAdded = function (mutations) {
    // Since this code executes on each DOM addition or removal to the document,
    // this low-level code was added to be as performant as possible.
    var mutationsLength = mutations.length;
    for (var mutationIndex = 0; mutationIndex < mutationsLength; ++mutationIndex) {
        var mutation = mutations[mutationIndex];
        if (mutation.addedNodes &&
            mutation.addedNodes.length > 0) {

            var addedNodesLength = mutation.addedNodes.length;

            for (var addedNodeIndex = 0; addedNodeIndex < addedNodesLength; ++addedNodeIndex) {
                var addedNode = mutation.addedNodes[addedNodeIndex];

                if (addedNode &&
                    addedNode.tagName &&
                    addedNode.tagName == "TH" &&
                    addedNode.className &&
                    typeof addedNode.className.indexOf === 'function' &&
                    addedNode.className.indexOf('actionColumnHeader') != -1) {
                    debugger;
                    BfsListViewRowClick.addRowOnClickCheckBoxEventHandlerInLightning();
                    return;
                }
            }
        }
    }
}

BfsListViewRowClick.addRowOnClickCheckboxEventHandlerWhenListViewRowsAdded = function (mutations) {
    // Since this code executes on each DOM addition or removal to the document,
    // this low-level code was added to be as performant as possible.
    var mutationsLength = mutations.length;
    for (var mutationIndex = 0; mutationIndex < mutationsLength; ++mutationIndex) {
        var mutation = mutations[mutationIndex];
        if (mutation.addedNodes &&
            mutation.addedNodes.length > 0) {

            var addedNodesLength = mutation.addedNodes.length;

            for (var addedNodeIndex = 0; addedNodeIndex < addedNodesLength; ++addedNodeIndex) {
                var addedNode = mutation.addedNodes[addedNodeIndex];

                if (addedNode.className &&
                    (addedNode.className.indexOf('x-grid3-row') != -1 ||
                     addedNode.className.indexOf('dataRow') != -1)) {
                    BfsListViewRowClick.addRowOnClickCheckBoxEventHandlerInClassic();
                }
            }
        }
    }
}


BfsListViewRowClick.addRowOnClickCheckBoxEventHandlerInClassic = function () {
    var setupListViewRows = $('tr.dataRow');
    var checkboxRows = setupListViewRows.has('td:first-child input[type="checkbox"]');

    checkboxRows.on('click', BfsListViewRowClick.clickCheckboxFunction);

    var listviewRows = $('.listBody table.x-grid3-row-table tr');
    checkboxRows = listviewRows.has('td:first-child input[type="checkbox"]');

    checkboxRows.on('click', BfsListViewRowClick.clickCheckboxFunction);
}

BfsListViewRowClick.addRowOnClickCheckBoxEventHandlerInLightning = function () {
    var listviewRows = $('table.slds-table.uiVirtualDataTable tr');
    checkboxRows = listviewRows.has('td:nth-child(2) input[type="checkbox"]');

    checkboxRows.on('click', BfsListViewRowClick.clickCheckboxFunction);
}

BfsListViewRowClick.clickCheckboxFunction = function (e) {
    if (!$(e.target).is('input:checkbox')) {
        $(this).find('input:checkbox:first').click();
        e.stopImmediatePropagation();
    }
}

BfsListViewRowClick.initOnCheckboxRowClickHandlers = function () {
    debugger;
    var someLightningElement = document.getElementById('auraAppcacheProgress');

    if (someLightningElement) {
        BfsListViewRowClick.addLightningMutationObserver();
    }
    else {
        BfsListViewRowClick.addClassicMutationObserver();
        BfsListViewRowClick.addRowOnClickCheckBoxEventHandlerInClassic();
    }
}

BfsListViewRowClick.initOnCheckboxRowClickHandlers();