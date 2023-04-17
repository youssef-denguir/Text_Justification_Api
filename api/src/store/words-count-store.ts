import { Store } from "./core/store";

export class WordsCountStore extends Store<string, number> { 
  private static instance: WordsCountStore;

  static getInstance(): WordsCountStore {
    if (!WordsCountStore.instance) {
        WordsCountStore.instance = new WordsCountStore();
      }
      return WordsCountStore.instance;
  }

  private constructor() {
    super();
  }

}