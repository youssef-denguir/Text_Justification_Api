export class TextJustificationService {
  public justifyText(text: string): string {
    const textWords = text.split(/\s+/);
    return this.fullJustify(textWords, 80).join("\n");
  }

  private fullJustify(words: string[], maxWidth: number): string[] {
    const justifiedText = [];
    let currentLineWords = []; // list of words that contains all current line words
    let currentSentence = ""; // contains a string that represents our current line
    for (let i = 0; i < words.length; i++) {
      if (currentSentence.length + words[i].length < maxWidth) {
        // add space and count it
        const wordWithSpace = words[i].concat(" ");
        currentLineWords.push(wordWithSpace);
        currentSentence = currentSentence.concat(wordWithSpace);
        //this if condition handles the case were the word that we are processing is the last word of the text
        if (i === words.length - 1) {
          this.applyLeftJustification(currentSentence, maxWidth, justifiedText);
        }
      } else if (currentSentence.length + words[i].length === maxWidth) {
        justifiedText.push(currentSentence.concat(words[i]));
        // reset current line related variables to be able to process the next line properly
        currentLineWords = [];
        currentSentence = "";
      } else {
        this.appendRemainingSpacesEvenly(
          maxWidth,
          currentSentence.length,
          currentLineWords,
          justifiedText
        );
        // reset current line related variables to be able to process the next line properly
        currentLineWords = [];
        currentSentence = "";
        i--;
      }
    }

    return justifiedText;
  }

  private appendRemainingSpacesEvenly(
    maxWidth: number,
    currentLineCharactersLength: number,
    currentLineWords: Array<string>,
    justifiedText: Array<string>
  ): void {
    //this if conditions handles the case were we have only one word per line
    if (currentLineWords.length === 1) {
      this.applyLeftJustification(currentLineWords[0], maxWidth, justifiedText);
      return;
    }
    //as we always add a white space when we preprocess data, even for the last word in the line(because in preprocessing we still don't know that it will be the last word), we delete that extra space for the last word in the line here
    const lastWord = currentLineWords[currentLineWords.length - 1];
    if (lastWord.charAt(lastWord.length - 1) == " ") {
      currentLineWords[currentLineWords.length - 1] = lastWord.substring(
        0,
        lastWord.length - 1
      );
      currentLineCharactersLength--;
    }

    const remainingSpaces = maxWidth - currentLineCharactersLength;
    const spacesLengthPerSlot = remainingSpaces / (currentLineWords.length - 1);
    const extraRemainingSpaces =
      remainingSpaces % (currentLineWords.length - 1);
    const spacesToAdd = " ".repeat(spacesLengthPerSlot);

    for (let i = 0; i < currentLineWords.length - 1; i++) {
      // even spaces to add for all words
      currentLineWords[i] += spacesToAdd;

      // here we will split our extra remaining spaces between existing words until we have 0 extra remaining spaces.
      if (i < extraRemainingSpaces) {
        currentLineWords[i] += " ";
      }
    }
    justifiedText.push(currentLineWords.join(""));
  }

  private applyLeftJustification(
    currentSentence: string,
    maxWidth: number,
    justifiedText: Array<string>
  ): void {
    justifiedText.push(
      currentSentence.concat(" ".repeat(maxWidth - currentSentence.length))
    );
  }
}
