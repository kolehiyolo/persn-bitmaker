// document.addEventListener('keydown', (event) => {
//     var name = event.key;
//     console.log(`name = ${name}`);

//     pressButton(event.key, "down");
// });

document.addEventListener('keydown', (event) => {
    var name = event.key;
    console.log(`name = ${name}`);

    pressButton(event.key, "down");
});

let states = {
    sampleMode: false,
    sequenceMode: {
        status: false,
        sample: {
            w: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            a: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            s: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            d: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            i: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            j: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            k: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            l: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            q: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            e: {
                toggle: false,
                seq: [0, 0, 0, 0, 0, 0, 0, 0]
            },
        },

    }
}

function pressButton(key, mode) {
    let keyToPadMatrix = {
        w: 1,
        a: 2,
        s: 3,
        d: 4,
        i: 5,
        j: 6,
        k: 7,
        l: 8,
        q: 3,
        e: 4,
    }

    if (key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d" ||
        key === "i" ||
        key === "j" ||
        key === "k" ||
        key === "l"
    ) {
        if (states.sequenceMode.status === true) {
            if (states.sequenceMode.sample[key].toggle) {
                $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-seq`);
                $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-off`);

                $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).removeClass(`sound-on`);
                $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).addClass(`sound-off`);

                states.sequenceMode.sample[key].toggle = false;
            } else {
                $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-off`);
                $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-seq`);

                $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).addClass(`sound-on`);
                $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).removeClass(`sound-off`);
                states.sequenceMode.sample[key].toggle = true;
            }
        } else {
            if (mode === "down") {
                document.getElementById(`audio-${keyToPadMatrix[key]}`).play();
                $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-off`);
                $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-on`);

                setTimeout(() => {
                    $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-on`);
                    $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-off`);
                }, 200);
            } else {
                $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-on`);
                $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-off`);
            }
        }


    }

    switch (key) {
        case "q":
            if (states.sampleMode === false) {
                $(`.macro-3`).removeClass(`macro-off`);
                $(`.macro-3`).addClass(`macro-on`);
                console.log(`states.sampleMode = ${states.sampleMode}`);
                states.sampleMode = true;
            } else {
                $(`.macro-3`).removeClass(`macro-on`);
                $(`.macro-3`).addClass(`macro-off`);
                console.log(`states.sampleMode = ${states.sampleMode}`);
                states.sampleMode = false;
            }
            break;
        case "e":
            if (states.sequenceMode.status === false) {
                $(`.macro-4`).removeClass(`macro-off`);
                $(`.macro-4`).addClass(`macro-on`);
                states.sequenceMode.status = true;
            } else {
                $(`.macro-4`).removeClass(`macro-on`);
                $(`.macro-4`).addClass(`macro-off`);
                states.sequenceMode.status = false;
                states.sequenceMode.sample.w.toggle = false;
                states.sequenceMode.sample.a.toggle = false;
                states.sequenceMode.sample.s.toggle = false;
                states.sequenceMode.sample.d.toggle = false;
                states.sequenceMode.sample.i.toggle = false;
                states.sequenceMode.sample.j.toggle = false;
                states.sequenceMode.sample.k.toggle = false;
                states.sequenceMode.sample.l.toggle = false;
                $(`.pad-seq`).addClass(`pad-off`);
                $(`.pad-seq`).removeClass(`pad-seq`);
                $(`.sound-on`).addClass(`sound-off`);
                $(`.sound-on`).removeClass(`sound-on`);
            }
            break;
    }

    if (key === "1" ||
        key === "2" ||
        key === "3" ||
        key === "4" ||
        key === "5" ||
        key === "6" ||
        key === "7" ||
        key === "8"
    ) {
        if (states.sequenceMode.status === true) {
            let activeSamples = [];
            let letters = ["w", "a", "s", "d", "i", "j", "k", "l" ];

            letters.forEach(letter => {
                if (states.sequenceMode.sample[letter].toggle) {
                    if (states.sequenceMode.sample[letter].seq[key-1] === 0) {
                        states.sequenceMode.sample[letter].seq[key-1] = 1;

                        $(`.sequencer .sample-${keyToPadMatrix[letter]} .seq-${key}`).removeClass(`seq-off`);
                        $(`.sequencer .sample-${keyToPadMatrix[letter]} .seq-${key}`).addClass(`seq-on`);

                        console.log(`TURN ON`); 
                    } else {
                        console.log(`TURN OFF`); 
                        $(`.sequencer .sample-${keyToPadMatrix[letter]} .seq-${key}`).addClass(`seq-off`);
                        $(`.sequencer .sample-${keyToPadMatrix[letter]} .seq-${key}`).removeClass(`seq-on`);

                        states.sequenceMode.sample[letter].seq[key-1] = 0;
                    }
                }
            });

            // if (states.sequenceMode.sample[key].toggle) {
            //     $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-seq`);
            //     $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-off`);

            //     $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).removeClass(`sound-on`);
            //     $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).addClass(`sound-off`);

            //     states.sequenceMode.sample[key].toggle = false;
            // } else {
            //     $(`.pad.pad-${keyToPadMatrix[key]}`).removeClass(`pad-off`);
            //     $(`.pad.pad-${keyToPadMatrix[key]}`).addClass(`pad-seq`);

            //     $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).addClass(`sound-on`);
            //     $(`.sequencer .sample-${keyToPadMatrix[key]} .sound`).removeClass(`sound-off`);
            //     states.sequenceMode.sample[key].toggle = true;
            // }
        }
    }
}