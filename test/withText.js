const chai = require('chai');
const expect = chai.expect;

const encryptpwd = require('../');

const TEXT_SAMPLES = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, quasi sit nulla vel nihil voluptatum asperiores maxime ratione incidunt. Deserunt aperiam minus quibusdam a laudantium aspernatur ipsa eos eaque ratione',
  'Fourscore and seven years ago our fathers brought forth, on this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting-place for those who here gave their lives, that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we cannot dedicate, we cannot consecrate—we cannot hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they here gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth.',
  `Two households, both alike in dignity,
  In fair Verona, where we lay our scene,
  From ancient grudge break to new mutiny,
  Where civil blood makes civil hands unclean.
  From forth the fatal loins of these two foes5
  A pair of star-cross'd lovers take their life;
  Whose misadventured piteous overthrows
  Do with their death bury their parents' strife.
  The fearful passage of their death-mark'd love,
  And the continuance of their parents' rage,10
  Which, but their children's end, nought could remove,
  Is now the two hours' traffic of our stage;
  The which if you with patient ears attend,
  What here shall miss, our toil shall strive to mend.`,
  `Shall I compare thee to a summer's day?
  Thou art more lovely and more temperate:
  Rough winds do shake the darling buds of May,
  And summer's lease hath all too short a date:
  Sometime too hot the eye of heaven shines,
  And often is his gold complexion dimm'd;
  And every fair from fair sometime declines,
  By chance or nature's changing course untrimm'd;
  But thy eternal summer shall not fade
  Nor lose possession of that fair thou owest;
  Nor shall Death brag thou wander'st in his shade,
  When in eternal lines to time thou growest:
  So long as men can breathe or eyes can see,
  So long lives this and this gives life to thee.`,
  `Or I shall live your epitaph to make,
  Or you survive when I in earth am rotten;
  From hence your memory death cannot take,
  Although in me each part will be forgotten.
  Your name from hence immortal life shall have,
  Though I, once gone, to all the world must die:
  The earth can yield me but a common grave,
  When you entombed in men's eyes shall lie.
  Your monument shall be my gentle verse,
  Which eyes not yet created shall o'er-read,
  And tongues to be your being shall rehearse
  When all the breathers of this world are dead;
  You still shall live--such virtue hath my pen--
  Where breath most breathes, even in the mouths of men.`,
];
const PASSWORDS = ['helloworld', `2@:f'dLV<y@s-hXg`, `>P4'kV"AK<4U9w7H`, 'testpassword', `#uc^_wdaukr?hdvh`];

const getTextSampleDesc = (sampleIdx) => {
  const WORD_LIMIT = 5;

  const textSample = TEXT_SAMPLES[sampleIdx];

  let textSamplePreview = textSample;

  if (textSample.split(' ').length > WORD_LIMIT) {
    textSamplePreview = textSamplePreview.split(' ').slice(0, WORD_LIMIT).join(' ') + '...';
  }

  return `With text sample #${sampleIdx + 1} ('${textSamplePreview}')`;
};

describe('Encrypting and decrypting text', () => {
  TEXT_SAMPLES.forEach((sample, sampleIdx) => {
    describe(getTextSampleDesc(sampleIdx), () => {
      PASSWORDS.forEach((password, passwordIdx) => {
        const encrypted = encryptpwd.encrypt(sample, password);
        const decrypted = encryptpwd.decrypt(encrypted, password);

        it(`Should encrypt and decrypt successfully with sample password #${passwordIdx + 1} ('${password}')`, () => {
          expect(sample).to.equal(decrypted);
        });
      });
    });
  });
});
