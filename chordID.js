export function chordID(chordNotes){

    let notesSharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
    let notesFlats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

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
            possibleChords.push(notesSharps[(12 - k) % 12] + " PowerChord");
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
    ];

    for (let k = 0; k < 12; k += 1) {
        let chordFound = false;
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for(let i = 0; i < majTypes.length; i += 1){
            if (eqSet(tempSet, majTypes[i].set)) {
                possibleChords.push(notesSharps[(12 - k) % 12] + ` ${majTypes[i].name}`);
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
        let chordFound = false;
        tempSet = new Set();
        for (let i = 0; i < checkList.length; i += 1) {
            tempSet.add((checkList[i] + k) % 12);
        }
        tempSet.delete(7);
        for (let i = 0; i < minTypes.length; i += 1) {
            if (eqSet(tempSet, minTypes[i].set)) {
                possibleChords.push(notesSharps[(12 - k) % 12] + ` ${minTypes[i].name}`);
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


    //   ### Check dominant chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])
    // tempSet.discard(7)

    // if tempSet == dom7Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7")
    // if tempSet == dom9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 9")
    // if tempSet == dom11Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 11")
    // if tempSet == dom13Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 13")
    // if tempSet == dom7b9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7b9")
    // if tempSet == dom7Sharp9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7#9")
    // if tempSet == dom7b5Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7b5")
    // if tempSet == dom7b13Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7b13")
    // if tempSet == dom9b5Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 9b5")
    // if tempSet == alteredSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Alt")



    // ### Sus Chords ###
    // sus4Set = { 0, 5}
    // sus2Set = { 0, 2}
    // sus2sus4Set = { 0, 2, 5}
    // dom7sus4Set = { 0, 5, 10}
    // dom7sus2Set = { 0, 2, 10}
    // dom9Sus4Set = { 0, 5, 10, 2}
    // dom7b9SusSet = { 0, 5, 10, 1}
    // sus13Set = { 0, 10, 2, 5, 9}
    // sus13b9Set = { 0, 10, 1, 5, 9}
    // sus4b9Set = { 0, 5, 1}



    //   ### Check sus chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])
    // tempSet.discard(7)

    // if tempSet == sus4Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus4")
    // if tempSet == sus2Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus2")
    // if tempSet == sus2sus4Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus2sus4")
    // if tempSet == dom7sus4Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7sus4")
    // if tempSet == dom7sus2Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7sus2")
    // if tempSet == dom9Sus4Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 9sus4")
    // if tempSet == dom7b9SusSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " 7b9sus")
    // if tempSet == sus13Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus13")
    // if tempSet == sus13b9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus13b9")
    // if tempSet == sus4b9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " sus4b9")



    // ### Dim Chords ###
    // dimSet = { 0, 3, 6}
    // halfDimSet = { 0, 3, 6, 10}
    // fullDimSet = { 0, 3, 6, 9}


    //   ### Check dim chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])

    // if tempSet == dimSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " dim")
    // if tempSet == halfDimSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " halfDim")
    // if tempSet == fullDimSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " fullDim")




    // ### MinMaj Chords ###
    // minMajSet = { 0, 3, 11}
    // minMaj9Set = { 0, 3, 11, 2}
    // minMaj9b13Set = { 0, 3, 11, 2, 8}


    //   ### Check minMaj chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])
    // tempSet.discard(7)

    // if tempSet == minMajSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " minMaj")
    // if tempSet == minMaj9Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " minMaj9")
    // if tempSet == minMaj9b13Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " minMaj9b13")



    // ### Aug Chords ###
    // AugSet = { 0, 4, 8}
    // Aug7Set = { 0, 4, 8, 10}
    // AugMaj7Set = { 0, 4, 8, 11}


    //   ### Check aug chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])

    // if tempSet == AugSet:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Aug")
    // if tempSet == Aug7Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Aug7")
    // if tempSet == AugMaj7Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " AugMaj7")



    // ### b5 and #11 Chords ###
    // Majb5Set = { 0, 4, 6}
    // Maj7b5Set = { 0, 4, 6, 11}
    // Maj9b5Set = { 0, 4, 6, 11, 2}
    // maj7AddSharp11Set = { 0, 4, 7, 11, 6}
    // maj9AddSharp11Set = { 0, 4, 7, 11, 2, 6}
    // maj13Sharp11Set = { 0, 4, 7, 11, 2, 6, 9}
    // majAddSharp11Set = { 0, 4, 7, 6}

    //   ### Check b5 and #11 chords ###
    // for k in range(0, 12):

    //     tempSet = set([(x + k) % 12 for x in checkList])

    // if tempSet == Majb5Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Majb5")
    // if tempSet == Maj7b5Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Maj7b5")
    // if tempSet == Maj9b5Set:
    //     possibleChords.append(notesSharps[(0 - k) % 12] + " Maj9b5")      
    //     elif tempSet == maj7AddSharp11Set:
    // possibleChords.append(notesSharps[(0 - k) % 12] + " Maj7Add#11")
    //     elif tempSet == maj9AddSharp11Set:
    // possibleChords.append(notesSharps[(0 - k) % 12] + " Maj9Add#11")
    //     elif tempSet == maj13Sharp11Set:
    // possibleChords.append(notesSharps[(0 - k) % 12] + " Maj13#11")
    //     elif tempSet == majAddSharp11Set:
    // possibleChords.append(notesSharps[(0 - k) % 12] + " MajAdd#11")


    return possibleChords

}

function eqSet(xs, ys){
    return xs.size === ys.size &&
        [...xs].every((x) => ys.has(x));
}
