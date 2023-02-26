import Filesaver from 'file-saver';

import { surpriseMePrompts } from "../constants";

const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if(randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
};

const downloadImage = (_id: string, photo: string) => {
  Filesaver.saveAs(photo, `download-${_id}.jpg`);
};

export {
  getRandomPrompt,
  downloadImage,
}