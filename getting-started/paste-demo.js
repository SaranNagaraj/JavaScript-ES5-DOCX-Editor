// Paste options demo: pastes the same formatted content using different paste options.
(function () {
    var editor = container.documentEditor;

    function run(text, charFormat, paraFormat) {
        return { characterFormat: charFormat, text: text };
    }

    function buildSource() {
        var heading = { characterFormat: { fontFamily: 'Calibri', fontColor: '#0000FF', fontSize: 18 } };
        var arial = { fontFamily: 'Arial', fontColor: '#FF0000', bold: true };
        var green = { fontFamily: 'Calibri', fontColor: '#008000' };
        function bullet(t) {
            return {
                paragraphFormat: { listFormat: { listId: 1, listLevelNumber: 0 } },
                characterFormat: green,
                inlines: [{ characterFormat: green, text: t }]
            };
        }
        return JSON.stringify({
            sections: [{
                blocks: [
                    { paragraphFormat: { afterSpacing: 6 }, characterFormat: heading.characterFormat,
                      inlines: [run('Project Status Report', heading.characterFormat)] },
                    { paragraphFormat: { beforeSpacing: 12, afterSpacing: 12 }, characterFormat: arial,
                      inlines: [run('This paragraph contains custom formatting including font color, font family, bold text, and increased spacing.', arial)] },
                    bullet('Requirement Analysis'),
                    bullet('Development'),
                    bullet('Testing')
                ],
                headersFooters: {}
            }],
            lists: [{ abstractListId: 1, listId: 1 }],
            abstractLists: [{
                abstractListId: 1,
                levels: [{
                    listLevelPattern: 'Bullet', numberFormat: '\uf0b7', followCharacter: 'Tab',
                    characterFormat: { fontFamily: 'Symbol', fontColor: '#008000' },
                    paragraphFormat: { leftIndent: 36, firstLineIndent: -18 }
                }]
            }]
        });
    }

    function pasteWith(option) {
        editor.editor.paste(buildSource(), option);
        editor.focusIn();
    }

    // Place the cursor at a predefined insertion location (end of the default document).
    editor.selection.moveToDocumentEnd();

    document.getElementById('paste-keep').addEventListener('click', function () { pasteWith('KeepSourceFormatting'); });
    document.getElementById('paste-match').addEventListener('click', function () { pasteWith('MergeWithExistingFormatting'); });
    document.getElementById('paste-text').addEventListener('click', function () { pasteWith('KeepTextOnly'); });
})();
