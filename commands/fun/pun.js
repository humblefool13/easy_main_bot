const Discord = require('discord.js');
const { color, botpfp } = require("../../config.json");

module.exports = {
  name: 'pun',
  description: 'Just give random puns which **surely** can\'t even make you smile.',
  aliases: ['p'],
  usage: '`e;pun`',
  guildOnly: true,
  permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
  cooldown: 10,
  args: false,
  run: async (client, message) => {

    const joke1 = ['I gave this homeless guy $5 and an old lady behind me told me he\'s just going to use it for drugs, so I confronted him and asked where I could also get drugs for $5.',

      'My boss calls me "The computer" Not because of my calculation skills but because I go to sleep when left unattended for 15 minutes.',

      'I met my girlfriend whilst she was working at the zoo. There she was in her uniform – straightaway I knew she was a keeper.',

      'Your mum is so slow . \n||It took her 9 months to come up with a good joke.||',

      'A German boy never uttered a single word growing up. Then ,one day, aged 5, while sitting at breakfast, he looked up from his plate and said in perfect German - \'The toast is burn\'t\'...\n\nto which the family were amazed at. \n\'You can speak, that\'s amazing, why have you never spoken until now?\'\n\nHe replied: \'There was nothing wrong until now .\'',

      'I told my wife she should embrace her mistakes... \n||She hugged me.||',

      'It was no wonder there was a toilet paper shortage. \nGiven the number of assholes in the country.',

      'Why do we tell actors to “break a leg?” \n||Because every play has a cast.||',

      'What do you call a fake noodle? \n||An impasta.||',

      'My friend thinks he is smart. He told me an onion is the only food that makes you cry, \nso I threw a coconut at his face. :)',

      'Q: Is Google male or female? \n\nA: Female, because it doesnt let you finish a sentence before making a suggestion.',

      'A boy asks his father, "Dad, are bugs good to eat?" \n\n"That\'s disgusting. Don\'t talk about things like that over dinner," the dad replies. \n\nAfter dinner the father asks, "Now, son, what did you want to ask me?" \n\n"Oh, nothing," the boy says. "There was a bug in your soup, but now it’s gone."',

      'Math Teacher: "If I have 5 bottles in one hand and 6 in the other hand, what do I have?" \nStudent: "A drinking problem."',

      'A mom texts, "Hi! Son, what does IDK, LY, & TTYL mean?" \n\nHe texts back, "I Don\'t Know, Love You, & Talk To You Later." \n\nThe mom texts him, "It\'s ok, don\'t worry about it. I\'ll ask your sister, love you too.',

      'Don\'t break anybody\'s heart; they only have 1. \n||Break their bones; they have 206.||',

      'I was wondering why the ball kept getting bigger and bigger, ||and then it hit me.||',

      'Did you hear about the guy whose whole left side was cut off? \n||Hes all right now.||',

      'I went to see the doctor about my blocked ear. \n\n“Which ear is it?” he asked. \n\n“2021,” I replied. :)',

      '||Your life.||\n\n||Yeah it been a poor pun ever since :P||',

      'What did the shark say when it ate a clownfish? \n\n||\'This tastes a little funny.\'||'];



    const joke2 = ['I got my daughter a fridge for her birthday.\n\nI can’t wait to see her face light up when she opens it.',

      'I poured root beer in a square glass.\nNow I just have beer.',

      'Why aren’t koalas actual bears?\n\n||They don’t meet the koalafications.||',

      'Why did the nurse need a red pen at work?\n\n||In case she needed to draw blood.||',

      'How do you throw a space party?\n\n||You planet.||',

      'Why did it get so hot in the baseball stadium after the game?\n\n||All of the fans left.||',

      'What do you call a train carrying bubblegum?\n\n||A chew-chew train.||',

      'Why did the math textbook visit the guidance counselor?\n\n||It needed help figuring out its problems.||',

      'Why can’t male ants sink?\n\n||They’re buoy-ant.||',

      'Want to hear a construction joke?\n\nOh never mind, I’m still working on that one.',

      'Talk is cheap?\n\n||Have you ever talked to a lawyer?||',

      'Why did the gym close down?\n\n||It just didn’t work out!||',

      'Two artists had an art contest.\n\n||It ended in a draw!||',

      'I tried to sue the airport for misplacing my luggage.\n\n||I lost my case.||',

      'I have a fear of speed bumps.\n\nBut I am slowly getting over it.',

      'Where do you find a cow with no legs?\n\n||Right where you left it.||',

      'What did one traffic light say to the other?\n\n||Stop looking! I’m changing!||',

      'What type of sandals do frogs wear?\n\n||Open-toad!||',

      'Why was six afraid of seven?\n\n||Because seven ate nine.||',

      'Why doesn’t the sun go to college?\n\n||Because it has a million degrees!||'];

    const joke3 = ['How do you count cows?\n\n||With a cowculator.||',

      'Why are skeletons so calm?\n\n||Because nothing gets under their skin.||',

      'Why is England the wettest country?\n\n||Because so many kings and queens have been reigning there.||',

      'Did you hear about the kidnapping at school?\n\n||It’s okay. He woke up.||',

      'What are shark’s two most favorite words?\n\n||Man overboard!||',

      'Can February march?\n\n||No, but April may.||',

      'Where does the sheep get his hair cut?\n\n||The baa baa shop!||',

      'Why are ghosts such bad liars?\n\n||Because they are easy to see through.||',

      'Why does Humpty Dumpty love autumn?\n\n||Because Humpty Dumpty had a great fall.||',

      'Where do fish sleep?\n\n||In the riverbed.||',

      'How do trees get online?\n\n||They just log on!||',

      'What do you call a bear with no teeth?\n\n||A gummy bear.||',

      'Why couldn’t the leopard play hide and seek?\n\n||Because he was always spotted.||',

      'Why did Adele cross the road? \n\n||To say hello from the other side.||',

      'I had a crazy dream last night! I was swimming in an ocean of orange soda. Turns out it was just a Fanta sea.',

      'My grandpa has the heart of the lion and a lifetime ban from the zoo.',

      'Why was Dumbo sad? \n\n||He felt irrelephant.||',

      'Yesterday, I accidentally swallowed some food coloring. The doctor says I’m okay, but I feel like I’ve dyed a little inside.',

      'So what if I don’t know what apocalypse means?\n\n||It’s not the end of the world!||',

      'My friend drove his expensive car into a tree and found out how his Mercedes bends.'];

    const joke4 = ['Never trust an atom,\n\n||they make up everything!||',

      'Waking up this morning was an eye-opening experience.',

      'Long fairy tales have a tendency to dragon.',

      'What do you use to cut a Roman Emperor’s hair? \n\n||Ceasers.||',

      'The Middle Ages were called the Dark Ages because there were too many knights.',

      'I made a pun about the wind but it blows.',

      'My friend’s bakery burned down last night.\n\n||Now his business is toast.||',

      'Getting the ability to fly would be so uplifting.',

      'It’s hard to explain puns to kleptomaniacs because they always take things literally.',

      'Two windmills are standing in a wind farm. One asks, “What’s your favorite kind of music?” The other says, “I’m a big metal fan.”',

      'I can’t believe I got fired from the calendar factory. \n\n||All I did was take a day off!||',

      'England doesn’t have a kidney bank, but it does have a Liverpool.',

      'What do you call the wife of a hippie? \n\n||Mississippi.||',

      'She had a photographic memory, but never developed it.',

      'I wasn’t originally going to get a brain transplant, but then I changed my mind.',

      'Why don’t oysters donate to charity? \n\n||Because they’re shellfish.||',

      'What does a baby computer call its father?\n\n||Data.||',

      'Why are colds bad criminals? \n\n||Because they’re easy to catch.||',

      'Which knight invented King Arthur’s Round Table? \n\n||Sir Cumference.||',

      'What do sprinters eat before a race? \n\n||Nothing. They fast.||'];

    const joke5 = ['What do you call a belt made of watches? \n\n||A waist of time!||',

      'Why did Adele cross the road?\n\n||To say hello from the other side!||',

      'What did the teacher do with the student’s report on cheese? \n\n||She grated it.||',

      'What’s the difference between a piano and a fish? \n\n||You can tune a piano, but you can’t tuna fish.||',

      'How do you organize an astronomer’s party? \n\n||You planet.||',

      'Why did the scarecrow get promoted? \n\n||Because he was outstanding in his field.||',

      'What do you call a fish with no eye? \n\n||Fsh.||',

      'What kind of car does an egg drive?\n\n||A Yolkswagen.||',

      'What do you call a factory that sells generally decent goods?\n\n||A satisfactory.||',

      'I want a job cleaning mirrors. \n\nIt’s something I can really see myself doing.',

      'What grades did the pirate get on his report card? \n\n||Seven Cs.||',

      'What do you call a person with a briefcase in a tree? \n\n||A branch manager.||',

      'Why did the baby cookie cry? \n\n||Because its mother was a wafer so long.||',

      'Why do you never see elephants hiding in trees? \n\n||Because they’re so good at it!||',

      'Did you hear about the claustrophobic astronaut? \n\n||Poor guy really needed some space.||',

      'Why are there fences are cemeteries? \n\n||Because everyone’s always dying to get in.||',

      'What did one wall say to the other? \n\n||“Meet me at the corner!”||',

      'Why did Mozart hate chickens? \n\n||Because when he asked them for their favorite composer, they said, “Bach! Bach! Bach!”||',

      'What’s the best name for a man who can’t stand? \n\n||Neil.||',

      'What do you call a deer with no eyes? \n\n||No eyed deer.||'];

    const joke6 = ['Why are groups of fish so smart? \n\n||Because they travel in schools.||',

      'Why shouldn\'t you write with a dull pencil? \n\n||Because it\'s pointless.||',

      'How many tickles can an octopus take? \n\n||Tentacles!||',

      'What do clouds wear under their shorts? \n\n||Thunderpants.||',

      'Why did Cinderella get kicked off of the soccer team? \n\n||Because she kept running from the ball!||',

      'How many ears do space aliens have? \n\n||Three: The left ear, right ear and the final front ear.||',

      'Cosmetic surgery used to be taboo, \nbut now when you talk about Botox no one raises an eyebrow.',

      'Did you hear the one about the three watering holes in the ground? \n\n||Well, well, well…||',

      'I have the world’s worst thesaurus. \n\n||Not only is it terrible,|| \n\n||it’s also terrible.||',

      'Why did the invisible man turn down a job offer? \n\n||He couldn’t see himself doing it.||',

      'What do you call a fish with two knees? \n\n||A tunee fish.||',

      'What do you call a canine magician? \n\n||A labracadabrador.||',

      '||The rotation of the earth really makes my day.||',

      'Why do seagulls fly over the sea? \n\n||Because if they flew over the bay, they’d be called bagels.||',

      'What do you call Samsung’s security team? \n\n||The Guardians of the Galaxy!||',

      'Why did the golfer need new pants? \n\n||Because he got a hole in one.||',

      'What do you call someone who points out the obvious? \n\n||Someone who points out the obvious.||',

      'What sound does a nut make when it sneezes? \n\n||Cashew!||',

      'What did the Atlantic Ocean say to the Pacific Ocean? \n\n||Nothing, it just waved.||',

      'What did the fish say when it swam into the wall? \n\n||“Dam!”||'];

    const joke7 = ['Which school supply is king? \n\n||The ruler.||',

      'What do you call a person with no body and no nose? \n\n||Nobody knows.||',

      'What’s the worst part of being an egg? \n\n||You only get laid once (and it’s with your mom)!||',

      'What’s the difference between a dapper man on a bicycle and a poorly dressed man on a unicycle? \n\n||Attire!||',

      'Parallel lines have so much in common. \n\n||It’s a shame they’ll never meet.||',

      'What do you call an Italian astronaut? \n\n||A specimen.||',

      'Why do ghosts love elevators? \n\n||Because they lift their spirits.||',

      'What can you do if you’re scared of elevators? \n\n||Take steps to avoid them.||',

      'How do prisoners communicate with one another? \n\n||Cell phones.||',

      'What did one elevator say to the other? \n\n||“I think I’m coming down with something.”||',

      'What’s a foot’s favorite snack? \n\n||Dori-toes.||',

      'The shovel was a truly groundbreaking invention.',

      'You know why they called it “the dark ages?” \n\n||There were too many knights.||',

      'What’s the loudest kind of pet you can get? \n\n||A trumpet.||',

      'Have you heard the joke about the bed? \nNo? \n||That’s because it hasn’t been made yet.||',

      'Why can’t wildcats take tests? \n\n||There are too many cheetahs.||',

      'A man died after drinking varnish. \n||It was a terrible end, \nbut a beautiful finish.||',

      'What kind of dinosaur has the biggest vocabulary? \n\n||The thesaurus!||',

      'What did the grape do when it got stomped on? \n\n||It let out a little wine.||',

      'What’s the best time to see a dentist? \n\n||Tooth hurty.||'];

    const joke8 = ['A teacher is teaching a class and she sees that Johnny isn\'t paying attention, so she asks him, "If there are three ducks sitting on a fence, and you shoot one, how many are left?" Johnny says, "None." The teacher asks, "Why?" Johnny says, "Because the shot scared them all off." The teacher says, "No, two, but I like how you\'re thinking." Johnny asks the teacher, "If you see three women walking out of an ice cream parlor, one is licking her ice cream, one is sucking her ice cream, and one is biting her ice cream, which one is married?" The teacher says, "The one sucking her ice cream." Johnny says, "No, the one with the wedding ring, but I like how you\'re thinking!"',

      'A few months after his parents were divorced, little Johnny passed by his mom\'s bedroom and saw her rubbing her body and moaning, "I need a man, I need a man!" Over the next couple of months, he saw her doing this several times. One day, he came home from school and heard her moaning. When he peeked into her bedroom, he saw a man on top of her. Little Johnny ran into his room, took off his clothes, threw himself on his bed, started stroking himself, and moaning, "Ohh, I need a bike! I need a bike!"',

      'A man is lying on the beach, wearing nothing but a cap over his crotch. A woman passing by remarks, "If you were any sort of a gentleman, you would lift your hat to a lady." He replies, "If you were any sort of a sexy lady, the hat would lift by itself."',

      '"Babe is it in?" \n"Yea." \n"Does it hurt?" \n"Uh huh." \n"Let me put it in slowly." \n"It still hurts." \n||"Okay, let\'s try another shoe size."||',

      'A woman places an ad in the local newspaper. “Looking for a man with three qualifications: won’t beat me up, won’t run away from me, and is great in bed.” Two days later her doorbell rings. “Hi, I’m Tim. I have no arms so I won’t beat you, and no legs so I won\'t run away.” “What makes you think you are great in bed?” the woman retorts. Tim replies, “I rang the doorbell, didn’t I?”',

      'Three guys go to a ski lodge, and there aren\'t enough rooms, so they have to share a bed. In the middle of the night, the guy on the right wakes up and says, "I had this wild, vivid dream of getting a hand job!" The guy on the left wakes up, and unbelievably, he\'s had the same dream, too. Then the guy in the middle wakes up and says, "That\'s funny, I dreamed I was skiing!"',

      'During a discussion at Sunday school, a nun asks the children what they think God takes you by when you die. A kid responds, "I think God takes you by your feet, because once I walked into my parents room and my mom\'s feet were in the air and she was screaming, "Oh God, I\'m coming!!!"',

      'Maria, a devout Catholic, got married and had 15 children. After her first husband died, she remarried and had 15 more children. A few weeks after her second husband died, Maria also passed away. At Maria\'s funeral, the priest looked skyward and said, "At last, they\'re finally together." Her sister sitting in the front row said, "Excuse me, Father, but do you mean she and her first husband, or she and her second husband?" The priest replied, "I mean her legs."',

      'A guy and his wife are sitting and watching a boxing match on television. \n\nThe husband sighs and complains, “This is disappointing. It only lasted for 30 seconds!” \n\n“Good,” replied his wife. \n“Now you know how I always feel.”',

      '"Daddy, where did I come from?" seven-year-old Rachel asks. It is a moment for which her parents have carefully prepared. They take her into the living room, get out several other books, and explain all they think she should know about sexual attraction, affection, love, and reproduction. Then they both sit back and smile contentedly. "Does that answer your question?" the mom asks. "Not really," the little girl says. "Judy said she came from Detroit. I want to know where I came from."',

      'Mother: "Sweetie, make a Christmas wish." Girl : "I wish that Santa will send some clothes to those naked girls in papa\'s computer."',

      'Q: Why is Santa Claus\' sack so big? \n\n||A: He only comes once a year.||',

      'A guy takes his girlfriend to his bedroom, drops his pants, and says, "Meet my little brother." \n\nThe girlfriend picks up her purse on the way out and says, "Call me when he grows up."',

      'One day Little Johnny asks his Mum, "How come when I come in to your room you and you\'re on top of Daddy, you say you\'re making a sandwich, but after a while I come in again, you\'re eating a sausage?!"',

      'A kid walks up to his mom and asks, "Mom, can I go bungee jumping?" The mom says "No, you were born from broken rubber and I don\'t want you to go out the same way!"',

      'Four nuns are in line to go into heaven. God asks the first nun if she has ever sinned. She says, "Well, I\'ve seen it." So God puts holy water on her eyes and lets her enter. He asks the second nun the same thing and she says, "I\'ve held it," so he puts holy water on her hands and lets her enter. Then the fourth nun skips the third nun in line and God asks why she did that. The 4th nun replies, "Well, I need to gargle it before she sits in it."',

      'You know you\'re getting old when your wife says, "Honey, lets run upstairs and make love," and you answer, "I can\'t do both."',

      'What did the egg say after he was put in a pot of boiling water? \n\n||I just got laid by a chick and now I\'m getting hard.||',

      'A patient says, “Doctor, can I get AIDS from a toilet seat?” \n\nThe doctor replies, “Yes, but only by sitting down before the last guy gets up.”',

      'A woman seated herself in the psychiatrists office. \n\n"What seems to be the problem?" the doctor asked. \n\n"Well, I, uh," she stammered. \n"I think I, uh, might be a nymphomaniac." \n\n"I see," he said. \n"I can help you, but I must advise you that my fee is $80 an hour." \n\n"That\'s not bad," she replied. \n"How much for all night?"'];

    const joke9 = ['A man is talking to God. "God, how long is a million years?" \n\nGod answers, "To me, it\'s about a minute." \n\n"God, how much is a million dollars?" \n\n"To me, it\'s a penny." \n\n"God, may I have a penny?" \n\n"Wait a minute..." *and the minute lasted about a million years*',

      'An old teacher asked her student, \n\n"If I say, \'I am beautiful,\' which tense is that?" \n\nThe student replied, "It is obviously past."',

      'A boy asked his teacher "Can I go to the tolilet please miss?" \n\nbut the teacher said "No, we\'re doing the alphabet" \n5 Minutes later he asked again\n\nand the teacher says "no, it\'s your turn to do the alphabet." So he goes " A B C D E F G H I J K L M N O Q R S T U V W X Y Z". \n\nThen the teacher askes "where\'s your P?" \n\nHe replies with "It\'s halfway down my leg miss"',

      'Wife: "In my dream, I saw you in a jewelry store and you bought me a diamond ring."  \n\nHusband: "I had the same dream ||and I saw your dad paying the bill."||',

      'A husband asks his wife, "Will you marry after I die?" \nThe wife responds, "No, I will live with my sister." \nThe wife asks him back, "Will you marry after I die?" \nThe husband responds, "No, I will also live with your sister."',

      'A science teacher tells his class, "Oxygen is a must for breathing and life. It was discovered in 1773." \n\nA blonde student responds, "Thank God I was born after 1773! Otherwise I would have died without it."',

      'I knew a blonde that was so stupid, \nshe put lipstick on her forehead because she wanted to make up her mind.',

      'A thief stuck a pistol in a man\'s ribs and said, "Give me your money." \n\nThe gentleman, shocked by the sudden attack, said, "You cannot do this, I\'m a congressman!" \n\nThe thief replied, "In that case, give me MY money!"',

      'Being an astronaut is funny. \n\n||It\'s the only job where you get fired before you start work.||',

      'As an airplane is about to crash, a female passenger jumps up frantically and announces, "If I\'m going to die, I want to die feeling like a woman." She removes all her clothing and asks, "Is there someone on this plane who is man enough to make me feel like a woman?" A man stands up, removes his shirt and says, "Here, iron this!".',

      'How can you tell when an engineer is an extrovert. \n\n||He stares at YOUR shoes while he talks to you.||',

      'As a group of soldiers stood in formation at an Army Base, \nthe Drill Sergeant said, "All right! All you idiots fall out." \nAs the rest of the squad wandered away, one soldier remained at attention. \n\nThe Drill Instructor walked over until he was eye to eye with him, and then raised a single eyebrow. \n\nThe soldier smiled and said, "Sure was a lot of \'em, huh, sir?"',

      'Q: Why do hamburgers go to the gym \n\n||A: To get better buns!||',

      'Q: If you have 13 apples in one hand and 10 oranges in the other, what do you have? \n\n||A: Big hands.||',

      'Q: How can you drop a raw egg onto a concrete floor without cracking it? \n\n||A: Any way you want, concrete floors are very hard to crack.||',

      'Q: Why did the tofu cross the road? \n\n||A: To prove he wasn\'t chicken.||',

      'A guy is going on an ocean cruise and he tells his doctor that he\'s worried about getting seasick. The doctor suggests ,\'Eat two pounds of stewed tomatoes before you leave the dock.\' The guy replies, \'Will that keep me from getting sick, Doc?\' , The doctor says, "No, but it\'ll look really pretty in the water.',

      'A man got hit in the head with a can of Coke, but he was alright because \n\n||it was a soft drink.||',

      'Q: What did the blanket say when it fell of the bed? \n\n||A: "Oh sheet!"||',

      'Q: What is the difference between a teacher and a train? \n\n||A: One says, "Spit out your gum," and the other says, "Choo choo choo!"||'];

    const joke10 = ['What do you call a can opener that doesn\'t work ? \n\n||A can\'t opener.||',

      'There are three types of people in the world : \n\n||Those who can count and those who can\'t .||',

      'Did you hear about the Italian chef who died? \n\n||He pasta-way.||',

      'Two muffins were sitting in an oven. \n\nOne turned to the other and said, ||“Wow, it’s pretty hot in here.”|| \n\nThe other one shouted, ||“Wow, a talking muffin!”||',

      'I sold my vacuuum the other day . \n\n||All it was doing was collecting dust.||',

      'Did you hear about the guy who invented ||\'knock - knock\'|| joke ? \n\n||He won the \'no - bell\' prize .||',

      'What\'s red and bad for your teeth? \n\n||A brick. :)||',

      'Why can\'t a nose be 12 inches long? \n\n||Because then it gonna be a foot.||',

      'Why don\'t dinosaurs talk? \n\n||Because they are dead.||',

      'What do you call a fly with no wings? \n\n||A walk.||',

      'What did the buffalo say when his son left? \n\n||Bison.||',

      'What’s green and has wheels? \n\n||Grass , i lied about the wheels :P .||',

      'Three fishes are in a tank . \n\n||One asks others \'how do you drive this thing? \'||',

      'What\'s the dumbest animal in the jungle? \n\n||A polar bear. ||',

      'I don\'t trust stairs . \n\n||They are always upto something .||',

      'Wife: “How do I look?” \n\n Husband : "With your eyes" \n\n||5 mins later... \n*husband gets homeless*.||',

      'eBay is so useless , I only searched for a lighter , \n\n||all they had was "13749 matches."||',

      'Wanna hear two short jokes and a long joke?\n ||Joke||\n||Joke||\n||JJJJJJJJJJooooooooooookkkkkkkkkkkkeeeeeeeeee||',

      'Why do you never see pigs hiding in trees?\n\n||Because they’re pretty good at it.|| ',

      'How do you make holy water? \n\n||You boil the hell out of it.||'];

    const superArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const chsuperArray = superArray[Math.floor(Math.random() * 10)];
    switch (chsuperArray) {
      case 1:
        const embed1 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke1[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed1],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 2:
        const embed2 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke2[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed2],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 3:
        const embed3 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke3[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed3],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 4:
        const embed4 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke4[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed4],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 5:
        const embed5 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke5[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed5],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 6:
        const embed6 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke6[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed6],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 7:
        const embed7 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke7[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed7],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 8:
        const embed8 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke8[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed8],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 9:
        const embed9 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke9[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed9],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      case 10:
        const embed10 = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle('PUNS here -')
          .setDescription(joke10[Math.floor(Math.random() * 20)])
          .setTimestamp();
        message.reply({
          embeds: [embed10],
          allowedMentions: {
            "parse": []
          }
        });
        break;
      default:
        console.log('COULDN\'T FIND ANY PUN.');

    }//switch
  }
}//execute+module.exports
