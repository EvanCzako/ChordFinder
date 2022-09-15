import {chordID} from "./chordID.js"

let keys;
let noteList;
let chordList;
let litKeys = new Set();
let keyArr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

window.addEventListener('DOMContentLoaded', () => {
    noteList = document.getElementById('note-list');
    chordList = document.getElementById('chord-list');
    keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; i += 1) {
        keys[i].addEventListener('click', () => {
            if (keys[i].classList.contains('lit')) {
                keys[i].classList.remove('lit');
                litKeys.delete(keys[i].id);
            } else {
                keys[i].classList.add('lit');
                litKeys.add(keys[i].id);
            }
            updateNoteList();
        });
    }

});

function updateNoteList(){
    let litNotesArr = Array.from(litKeys);
    for(let i = 0; i < litNotesArr.length; i += 1){
        litNotesArr[i] = litNotesArr[i].slice(0,litNotesArr[i].length-1)
    }
    noteList.innerHTML = litNotesArr;
    chordList.innerHTML = chordID(litNotesArr);
    // console.log(litNotesArr);
    // console.log(chordID(litNotesArr));
}

function getLowestNote(){
    let noteArr = Array.from(litKeys);
    let lowestOct;
    let note;
    for(let i = 0; i < noteArr.length; i += 1){
        note = noteArr[i];
        if(!lowestOct){
            lowestOct = note[note.length-1];
        }
        if(lowestOct > note[note.length-1]){
            lowestOct = note[note.length-1];
        }
    }
    for(let i = 0; i < keyArr.length; i += 1){
        if(noteArr.includes(keyArr[i] + lowestOct)){
            return keyArr[i];
        }
    }
    
}