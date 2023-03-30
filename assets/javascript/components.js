console.log(`RUNNING component.js`);

let padLetters = [`w`, `a`, `s`, `d`, `i`, `j`, `k`, `l`];

function createHTML(type, className, content) {
    return `<${type} class="${className}">${(content!=undefined) ? content : ``}</${type}>`;
}

function addSequencers() {
    // * Set Variables
    let column1 = "";
    let column2 = "";

    let sequences = "";

    // * Fill the Sequences
    for (let i = 1; i <= 8; i++) {
        sequences += createHTML("p", `seq seq-off seq-${i}`, i);
    }

    // * Fill the Columns
    for (let i = 1; i <= 8; i++) {
        let hotKey = padLetters[i-1];
        let html = createHTML("div", `sample sample-${i}`,
        createHTML("p", "", hotKey) +
        createHTML("div", "sound sound-off", hotKey) +
        createHTML("div", "sequences", sequences)
        );

        if (i <= 4) {
            column1 += html;
        } else {
            column2 += html;
        }
    }

    // * Add to HTML
    $(`.sequencer .column.column-1`).html(column1);
    $(`.sequencer .column.column-2`).html(column2);
}

function addPads() {
    // * Set Variables
    let row1 = "";
    let row2 = "";

    // * Fill the Rows
    for (let i = 1; i <= 8; i++) {
        let hotKey = padLetters[i-1];
        let html = createHTML("div", `pad pad-off pad-${i}`,
            createHTML("div", "info", 
                createHTML("p", "key", hotKey) +
                createHTML("p", "sample", `sample-${hotKey}`)
            )
        );

        if (i <= 4) {
            row1 += html;
        } else {
            row2 += html;
        }
    }

    // * Add to HTML
    $(`.pads .row.row-1`).html(row1);
    $(`.pads .row.row-2`).html(row2);
}

addSequencers();
addPads();