import {chordID} from "./chordID.js"

let keys;
let noteList;
let mostLikely;
let chordList;
let sharpsToggle;
let litKeysSharp = new Set();
let litKeysFlat = new Set();
let litNotesArr;
let keyArrSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let keyArrFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let keyArr = keyArrFlats;

window.addEventListener('DOMContentLoaded', () => {
    sharpsToggle = document.getElementById('flats-toggle');
    noteList = document.getElementById('note-list');
    mostLikely = document.getElementById('most-likely');
    chordList = document.getElementById('chord-list');
    keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; i += 1) {
        keys[i].addEventListener('click', () => {
            if (keys[i].classList.contains('lit')) {
                keys[i].classList.remove('lit');
                litKeysSharp.delete(keys[i].id);
                litKeysFlat.delete(getFlatFromSharp(keys[i].id));
            } else {
                keys[i].classList.add('lit');
                litKeysSharp.add(keys[i].id);
                litKeysFlat.add(getFlatFromSharp(keys[i].id));
            }
            updateNoteList();
        });
    }
    sharpsToggle.addEventListener('change',()=>{
        keyArr = sharpsToggle.checked ? keyArrSharps : keyArrFlats;
        updateNoteList();
    })


});

function updateNoteList(){

    litNotesArr = sharpsToggle.checked ? 
    sortNotesArr(Array.from(litKeysSharp)) : 
    sortNotesArr(Array.from(litKeysFlat));
    let litTonesArr = litNotesArr.map((note) => note.slice(0,note.length-1));
    // for(let i = 0; i < litNotesArr.length; i += 1){
    //     litTonesArr[i] = litNotesArr[i].slice(0,litNotesArr[i].length-1)
    // }
    noteList.innerHTML = litNotesArr;
    let result = chordID(litTonesArr, !sharpsToggle.checked, litTonesArr[0]);
    mostLikely.innerHTML = result.mostLikely;
    chordList.innerHTML = result.possibleChords;

}

function getFlatFromSharp(note){
    return keyArrFlats[keyArrSharps.indexOf(note.slice(0,note.length-1))] + note[note.length-1];
}

function sortNotesArr(notesArr){
    if(notesArr.length <= 1){
        return [...notesArr];
    }
    let midpoint = Math.floor(notesArr.length/2);
    let left = notesArr.slice(0,midpoint);
    let right = notesArr.slice(midpoint,notesArr.length);
    return mergeSortedArrays(sortNotesArr(left),sortNotesArr(right),noteCompare);
}

function noteCompare(note1,note2){
    // Returns 1 if note2 is higher (up to octave 9)
    let octave1 = parseInt(note1.slice(note1.length - 1, note1.length));
    let octave2 = parseInt(note2.slice(note2.length - 1, note2.length));
    if (octave1 < octave2){
        return 1;
    } else if (octave1 > octave2){
        return -1;
    } else {
        if (keyArr.indexOf(note1.slice(0, note1.length - 1)) < keyArr.indexOf(note2.slice(0, note2.length - 1))){
            return 1;
        } else if (keyArr.indexOf(note1.slice(0, note1.length - 1)) > keyArr.indexOf(note2.slice(0, note2.length - 1))) {
            return -1;
        } else {
            return 0;
        }
    }
}

function mergeSortedArrays(arr1,arr2,compFunc){
    let merged = [];
    while(arr1.length > 0 && arr2.length > 0){
        if(compFunc(arr1[0],arr2[0]) === 1){
            merged.push(arr1.shift());
        } else {
            merged.push(arr2.shift());
        }
    }
    return merged.concat(arr1).concat(arr2);
}