const chai = require('chai');
const expect = chai.expect;

const encryptpwd = require('../');

const OBJ_SAMPLES = [
  {
    anInt: 5,
    aString:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae cumque, tempore aliquid culpa, hic nesciunt similique, quo sint ipsum rerum nostrum iusto. Id iste exercitationem aliquam illum. A, quam aliquam',
    anArray: [5, 1, 'hello world', 'test'],
  },
  {
    one: 'lorem',
    two: 'ipsum',
    three: 'dolor',
    four: 'sit',
    five: 'amet',
  },
  {
    1: ['one'],
    2: 'two',
    3: 3,
    four: [4],
  },
  {
    anObj: {
      aKey: 'a value',
      anotherKey: 'another value',
    },
  },
  {
    aSpeech:
      'Fourscore and seven years ago our fathers brought forth, on this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting-place for those who here gave their lives, that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we cannot dedicate, we cannot consecrate—we cannot hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they here gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth.',
    aSonnet: `Shall I compare thee to a summer’s day?
Thou art more lovely and more temperate.
Rough winds do shake the darling buds of May,
And summer’s lease hath all too short a date.
Sometime too hot the eye of heaven shines,
And often is his gold complexion dimmed;
And every fair from fair sometime declines,
By chance, or nature’s changing course, untrimmed;
But thy eternal summer shall not fade,
Nor lose possession of that fair thou ow’st,
Nor shall death brag thou wand'rest in his shade,
When in eternal lines to Time thou grow'st.
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee.`,
  },
];
const PASSWORDS = ['helloworld', `2@:f'dLV<y@s-hXg`, `>P4'kV"AK<4U9w7H`, 'testpassword', `#uc^_wdaukr?hdvh`];

const getObjSampleDesc = (sampleIdx) => {
  const CHAR_LIMIT = 25;

  const objSample = OBJ_SAMPLES[sampleIdx];

  let objSamplePreview = JSON.stringify(objSample);

  if (objSamplePreview.length > CHAR_LIMIT) {
    objSamplePreview = objSamplePreview.substring(0, CHAR_LIMIT) + '...';
  }

  return `With object sample #${sampleIdx + 1} ('${objSamplePreview}')`;
};

describe('Encrypting and decrypting JSON', () => {
  OBJ_SAMPLES.forEach((sample, sampleIdx) => {
    describe(getObjSampleDesc(sampleIdx), () => {
      PASSWORDS.forEach((password, passwordIdx) => {
        const encrypted = encryptpwd.encryptJSON(sample, password);
        const decrypted = encryptpwd.decryptJSON(encrypted, password);

        it(`Should encrypt and decrypt successfully with sample password #${passwordIdx + 1} ('${password}')`, () => {
          expect(JSON.stringify(sample)).to.equal(JSON.stringify(decrypted));
        });
      });
    });
  });
});
