export function chordID(chordNotes, flats = false, lowNote = undefined){

    
    let notesSharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    let notesFlats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']
    let notesArr;
    if(flats){
        notesArr = notesFlats;
    } else {
        notesArr = notesSharps;
    }

    let possibleChords = [];

    let chordNotesIndices = new Set();

    for(let i = 0; i < chordNotes.length; i += 1){
        let note = chordNotes[i];
        if(notesSharps.includes(note)){
            chordNotesIndices.add(notesSharps.indexOf(note));
        } else if (notesFlats.includes(note)){
            chordNotesIndices.add(notesFlats.indexOf(note));
        }
    }


    let checkList = Array.from(chordNotesIndices);
    let tempSet;

    //   ### Power Chord ###
    let powerChordSet = new Set([0,7]);

    for(let k = 0; k < 12; k += 1){
        tempSet = new Set();
        for(let i = 0; i < checkList.length; i += 1){
            tempSet.add((checkList[i]+k)%12);
        }
        if(eqSet(tempSet,powerChordSet)){
            possibleChords.push(notesArr[(12 - k) % 12] + " PowerChord");
            break;
        }
    }



    //   ### Major Chords ###
    let majSet = {
        set: new Set([0,4]),
        name: "Maj"
    };
    let maj7Set = {
        set: new Set([0, 4, 11]),
        name: "Maj7"
    };
    let maj9Set = {
        set: new Set([0, 4, 11, 2]),
        name: "Maj9"
    };
    let maj11Set = {
        set: new Set([0, 4, 11, 2, 5]),
        name: "Maj11"
    };
    let maj13Set = {
        set: new Set([0, 4, 11, 2, 5, 9]),
        name: "Maj13"
    };
    let majAdd9Set = {
        set: new Set([0, 4, 2]),
        name: "MajAdd9"
    };
    let majAdd11Set = {
        set: new Set([0, 4, 5]),
        name: "MajAdd11"
    };
    let maj6Set = {
        set: new Set([0, 4, 9]),
        name: "Maj6"
    };
    let majAdd9Add11Set = {
        set: new Set([0, 4, 2, 5]),
        name: "MajAdd9Add11"
    };
    let sixNineSet = {
        set: new Set([0, 4, 2, 9]),
        name: "Maj69"
    };
    let majAdd11Add13Set = {
        set: new Set([0, 4, 5, 9]),
        name: "MajAdd11Add13"
    };
    let majAdd9Add11Add13Set = {
        set: new Set([0, 4, 2, 5, 9]),
        name: "MajAdd9Add11Add13"
    };
    let maj9Add13Set = {
        set: new Set([0, 4, 11, 2, 9]),
        name: "Maj9Add13"
    };
    let maj7Add13Set = {
        set: new Set([0, 4, 11, 9]),
        name: "Maj7Add13"
    };
    
    let majTypes = [
        majSet,
        maj7Set,
        maj9Set,
        maj11Set,
        maj13Set,
        majAdd9Set,
        majAdd11Set,
        maj6Set,
        majAdd9Add11Set,
        sixNineSet,
        majAdd11Add13Set,
        majAdd9Add11Add13Set,
        maj9Add13Set,
        maj7Add13Set
    ];

    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for(let i = 0; i < majTypes.length; i += 1){
            if (eqSet(tempSet, majTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${majTypes[i].name}`);
            }
        }
    }



    //   ### Minor Chords ###
    let minSet = {
        set: new Set([0, 3]),
        name: "min"
    };
    let min6Set = {
        set: new Set([0, 3, 9]),
        name: "min6"
    };
    let min7Set = {
        set: new Set([0, 3, 10]),
        name: "min7"
    };
    let min9Set = {
        set: new Set([0, 3, 10, 2]),
        name: "min9"
    };
    let min11Set = {
        set: new Set([0, 3, 10, 2, 5]),
        name: "min11"
    };
    let min13Set = {
        set: new Set([0, 3, 10, 2, 5, 9]),
        name: "min13"
    };
    let minAdd9Set = {
        set: new Set([0, 3, 2]),
        name: "minAdd9"
    };
    let minAdd11Set = {
        set: new Set([0, 3, 5]),
        name: "minAdd11"
    };
    let minAdd9Add11Set = {
        set: new Set([0, 3, 2, 5]),
        name: "minAdd9Add11"
    };
    let min6Add9Set = {
        set: new Set([0, 3, 2, 9]),
        name: "min6Add9"
    };
    let minAdd9Add11Add13Set = {
        set: new Set([0, 3, 2, 5, 9]),
        name: "minAdd9Add11Add13"
    };
    let min7Add11Set = {
        set: new Set([0, 3, 10, 5]),
        name: "min7Add11"
    };

    let minTypes = [
        minSet,
        min6Set,
        min7Set,
        min9Set,
        min11Set,
        min13Set,
        minAdd9Set,
        minAdd11Set,
        minAdd9Add11Set,
        min6Add9Set,
        minAdd9Add11Add13Set,
        min7Add11Set,
    ];


    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < minTypes.length; i += 1) {
            if (eqSet(tempSet, minTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${minTypes[i].name}`);
            }
        }
    }


    // ### Dominant Chords ###

    let dom7Set = {
        set: new Set([0, 4, 10]),
        name: "(Dom)7"
    };
    let dom9Set = {
        set: new Set([0, 4, 10, 2]),
        name: "(Dom)9"
    };
    let dom11Set = {
        set: new Set([0, 4, 10, 2, 5]),
        name: "(Dom)11"
    };
    let dom13Set = {
        set: new Set([0, 4, 10, 2, 5, 9]),
        name: "(Dom)13"
    };
    let dom7b9Set = {
        set: new Set([0, 4, 10, 1]),
        name: "(Dom)7b9"
    };
    let dom7Sharp9Set = {
        set: new Set([0, 4, 10, 3]),
        name: "(Dom)7#9"
    };
    let dom7b5Set = {
        set: new Set([0, 4, 10, 6]),
        name: "(Dom)7b5"
    };
    let dom7b13Set = {
        set: new Set([0, 4, 10, 8]),
        name: "(Dom)7b13"
    };
    let dom9b5Set = {
        set: new Set([0, 4, 10, 2, 6]),
        name: "(Dom)9b5"
    };
    let alteredSet = {
        set: new Set([0, 4, 10, 1, 3, 6, 8]),
        name: "Alt"
    };

    let domTypes = [
        dom7Set,
        dom9Set,
        dom11Set,
        dom13Set,
        dom7b9Set,
        dom7Sharp9Set,
        dom7b5Set,
        dom7b13Set,
        dom9b5Set,
        alteredSet,
    ];

    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < domTypes.length; i += 1) {
            if (eqSet(tempSet, domTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${domTypes[i].name}`);
            }
        }
    }


    // ### Sus Chords ###

    let sus4Set = {
        set: new Set([0, 5]),
        name: "sus4"
    };
    let sus2Set = {
        set: new Set([0, 2]),
        name: "sus2"
    };
    let sus2sus4Set = {
        set: new Set([0, 2, 5]),
        name: "sus2sus4"
    };
    let dom7sus4Set = {
        set: new Set([0, 5, 10]),
        name: "(Dom)7sus4"
    };
    let dom7sus2Set = {
        set: new Set([0, 2, 10]),
        name: "(Dom)7sus2"
    };
    let dom9Sus4Set = {
        set: new Set([0, 5, 10, 2]),
        name: "(Dom)9sus4"
    };
    let dom7b9SusSet = {
        set: new Set([0, 5, 10, 1]),
        name: "(Dom)7b9sus"
    };
    let sus13Set = {
        set: new Set([0, 10, 2, 5, 9]),
        name: "sus13"
    };
    let sus13b9Set = {
        set: new Set([0, 10, 1, 5, 9]),
        name: "sus13b9"
    };
    let sus4b9Set = {
        set: new Set([0, 5, 1]),
        name: "sus4b9"
    };

    let susTypes = [
        sus4Set,
        sus2Set,
        sus2sus4Set,
        dom7sus4Set,
        dom7sus2Set,
        dom9Sus4Set,
        dom7b9SusSet,
        sus13Set,
        sus13b9Set,
        sus4b9Set
    ];

    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < susTypes.length; i += 1) {
            if (eqSet(tempSet, susTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${susTypes[i].name}`);
            }
        }
    }



    // ### Dim Chords ###


    let dimSet = {
        set: new Set([0, 3, 6]),
        name: "dim"
    };
    let halfDimSet = {
        set: new Set([0, 3, 6, 10]),
        name: "halfDim"
    };
    let fullDimSet = {
        set: new Set([0, 3, 6, 9]),
        name: "fullDim"
    };

    let dimTypes = [
        dimSet,
        halfDimSet,
        fullDimSet,
    ];

    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < dimTypes.length; i += 1) {
            if (eqSet(tempSet, dimTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${dimTypes[i].name}`);
            }
        }
    }



    // ### MinMaj Chords ###


    let minMajSet = {
        set: new Set([0, 3, 11]),
        name: "minMaj"
    };
    let minMaj9Set = {
        set: new Set([0, 3, 11, 2]),
        name: "minMaj9"
    };
    let minMaj9b13Set = {
        set: new Set([0, 3, 11, 2, 8]),
        name: "minMaj9b13"
    };

    let minMajTypes = [
        minMajSet,
        minMaj9Set,
        minMaj9b13Set,
    ];


    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < minMajTypes.length; i += 1) {
            if (eqSet(tempSet, minMajTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${minMajTypes[i].name}`);
            }
        }
    }




    // ### Aug Chords ###

    let augSet = {
        set: new Set([0, 4, 8]),
        name: "Aug"
    };
    let aug7Set = {
        set: new Set([0, 4, 8, 10]),
        name: "Aug7"
    };
    let augMaj7Set = {
        set: new Set([0, 4, 8, 11]),
        name: "AugMaj7"
    };

    let augTypes = [
        augSet,
        aug7Set,
        augMaj7Set,
    ];


    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < augTypes.length; i += 1) {
            if (eqSet(tempSet, augTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${augTypes[i].name}`);
            }
        }
    }


    // ### b5 and #11 Chords ###

    let majb5Set = {
        set: new Set([0, 4, 6]),
        name: "Majb5"
    };
    let maj7b5Set = {
        set: new Set([0, 4, 6, 11]),
        name: "Maj7b5"
    };
    let maj9b5Set = {
        set: new Set([0, 4, 6, 11, 2]),
        name: "Maj9b5"
    };
    let maj7AddSharp11Set = {
        set: new Set([0, 4, 7, 11, 6]),
        name: "Maj7Add#11"
    };
    let maj9AddSharp11Set = {
        set: new Set([0, 4, 7, 11, 2, 6]),
        name: "Maj9Add#11"
    };
    let maj13Sharp11Set = {
        set: new Set([0, 4, 7, 11, 2, 6, 9]),
        name: "Maj13#11Set"
    };
    let majAddSharp11Set = {
        set: new Set([0, 4, 7, 6]),
        name: "MajAdd#11"
    };

    let otherTypes = [
        majb5Set,
        maj7b5Set,
        maj9b5Set,
        maj7AddSharp11Set,
        maj9AddSharp11Set,
        maj13Sharp11Set,
        majAddSharp11Set,
    ];


    for (let k = 0; k < 12; k += 1) {
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < otherTypes.length; i += 1) {
            if (eqSet(tempSet, otherTypes[i].set)) {
                possibleChords.push(notesArr[(12 - k) % 12] + ` ${otherTypes[i].name}`);
            }
        }
    }

    let mostLikely;
    

    if(possibleChords.length === 1){
        mostLikely = possibleChords[0];
        possibleChords = undefined;
    } else if(lowNote){
        for(let i = 0; i < possibleChords.length; i += 1){
            if(lowNote===possibleChords[i].slice(0,lowNote.length)){
                mostLikely = possibleChords[i];
                possibleChords = possibleChords.slice(0,i).concat(possibleChords.slice(i+1,possibleChords.length));
                break;
            }
        }
    }

    return {
        possibleChords,
        mostLikely,
    }
}

function eqSet(xs, ys){
    return xs.size === ys.size &&
        [...xs].every((x) => ys.has(x));
}
