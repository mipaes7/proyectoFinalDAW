-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isadmin BOOLEAN NOT NULL DEFAULT FALSE,
    islogged BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create manga table
CREATE TABLE manga (
    manga_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    synopsis TEXT,
    cover_image_url TEXT,
    genres VARCHAR(255),
    themes VARCHAR(255)
);

-- Create user_library table
CREATE TABLE user_library (
    library_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    manga_id INTEGER NOT NULL REFERENCES manga(manga_id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('Plan to Read', 'Reading', 'Finished', 'Dropped')),
    UNIQUE(user_id, manga_id)
);

-- Insert users into the users table
INSERT INTO users (username, email, password, isadmin, islogged) VALUES
('john_doe', 'john.doe@example.com', 'password123', FALSE, FALSE),
('jane_smith', 'jane.smith@example.com', 'securepassword', FALSE, FALSE),
('alice_jones', 'alice.jones@example.com', 'alicepass', FALSE, FALSE),
('bob_brown', 'bob.brown@example.com', 'bobspassword', FALSE, FALSE),
('charlie_black', 'charlie.black@example.com', 'charliespassword', FALSE, FALSE);

-- Insert mangas into the manga table
INSERT INTO manga (title, author, synopsis, cover_image_url, genres, themes) VALUES 
    ('GetBackers', 'Shin Kibayashi, Rando Ayamine', 'Blonde, hip, pragmatic and cool, Ginji Amano has the power to generate currents with his body like an electric eel. Brunette, equally hip, bespectacled and rambunctious, Ban Mido has the mystically mysterious ''Evil Eye,'' the power to create illusions in the minds of his foes. Together, they are the GetBackers, the best retrieval team in the world. They can get back anything taken from clients, and their success rate is (almost) 100%! However, first they have to get some clients—and soon—or this spry detective duo will starve on the streets! (Source: Tokyopop)', 'https://cdn.myanimelist.net/images/manga/1/169369l.jpg', 'Action, Comedy, Drama, Mystery, Supernatural, Ecchi', NULL),
    ('Hikaru no Go', 'Takeshi Obata, Yumi Hotta', 'When Hikaru Shindou discovers an old go board in his grandfather''s attic, he is greeted by the spirit of an ancient go master, Fujiwara no Sai. Sai spent his life teaching the techniques of the board game to an emperor during the Heian era, and now in his ghostly state, he is eager to share his passion with the unsuspecting Hikaru. The only problem is that Hikaru is not all that interested in board games. But Sai is not easily dissuaded. Pressured by Sai''s unrelenting desire to pursue something he refers to as the ''Divine Move,'' Hikaru begrudgingly consents to playing the game, executing moves as dictated by Sai. But slowly, intrigued by the dedication of his peers, he begins to learn the basics of the game. As Hikaru enters into the world of go, guided by his intangible tutor and inspired by his rival, Akira Touya, he cannot help but be drawn into the complex game as he grows determined to prove his own abilities. In a coming-of-age story centering around an ancient board game, Hikaru no Go tells the story of a boy maturing through the pursuit of his newfound passion. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/2/170574l.jpg', 'Award Winning, Comedy, Drama, Supernatural', 'Strategy Game'),
    ('Death Note', 'Takeshi Obata, Tsugumi Ohba', 'Ryuk, a god of death, drops his Death Note into the human world for personal pleasure. In Japan, prodigious high school student Light Yagami stumbles upon it. Inside the notebook, he finds a chilling message: those whose names are written in it shall die. Its nonsensical nature amuses Light; but when he tests its power by writing the name of a criminal in it, they suddenly meet their demise. Realizing the Death Note''s vast potential, Light commences a series of nefarious murders under the pseudonym ''Kira,'' vowing to cleanse the world of corrupt individuals and create a perfect society where crime ceases to exist. However, the police quickly catch on, and they enlist the help of L—a mastermind detective—to uncover the culprit. Death Note tells the thrilling tale of Light and L as they clash in a great battle-of-minds, one that will determine the future of the world. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/258245l.jpg', 'Supernatural, Suspense', 'Psychological'),
    ('Rurouni Kenshin: Meiji Kenkaku Romantan', 'Nobuhiro Watsuki', 'Ten years have passed since the end of Bakumatsu, an era of war that saw the uprising of citizens against the Tokugawa shogunate. The revolutionaries wanted to create a time of peace, and a thriving country free from oppression. The new age of Meiji has come, but peace has not yet been achieved. Swords are banned but people are still murdered in the streets. Orphans of war veterans are left with nowhere to go, while the government seems content to just line their pockets with money. One wandering samurai, Kenshin Himura, still works to make sure the values he fought for are worth the lives spent to bring about the new era. Once known as Hitokiri Battousai, he was feared as the most ruthless killer of all the revolutionaries. Now haunted by guilt, Kenshin has sworn never to kill again in atonement for the lives he took, and he may never know peace until killing is a thing of the past. Now in the 11th year of Meiji, Kenshin stumbles upon Kaoru Kamiya, owner and head instructor of a small dojo being threatened to close its doors. The police force is powerless to stop the string of murders done in the name of her dojo by a man claiming to be the famous Battousai. Kenshin''s wanderings pause for now as he joins Kaoru to clear both their names. But how long can he stay before his past catches up to him? [Written by MAL Rewrite] Included one-shot: Volume 28: Meteor Strike', 'https://cdn.myanimelist.net/images/manga/2/127583l.jpg', 'Action, Drama', 'Historical, Samurai'),
    ('Ranma ½', 'Rumiko Takahashi', 'Soun Tendou runs the Tendou Martial Arts School accompanied by his three daughters: Akane, Nabiki, and Kasumi. One day, the sisters'' lives are turned upside down when their father announces that he has promised one of them to be married to a fellow martial artist''s son in hopes of carrying on the family legacy. In addition to their mixed reactions, when the fiancé arrives, the last thing the Tendou family expects is Ranma Saotome and his father, Genma. Ranma has been training in China with his father until an unfortunate accident changed them both. Now, when water touches them, Ranma turns into a girl and Genma into a giant panda. Ranma ½ follows Ranma as he attempts to get along with his newly betrothed, the youngest of the Tendou sisters, Akane. As the two begin to attend the same school, they deal with fellow friends and rivals, all of whom have something to say about their engagement. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/156534l.jpg', 'Action, Comedy, Romance, Ecchi', 'Harem, Martial Arts, School'),
    ('D.Gray-man', 'Katsura Hoshino', 'Thousands of years ago, there existed those gifted with the power of God. Their mission: to destroy the ominous evils that lurk in the darkness known as ''Akuma.'' Led by the Milenium Earl, Akuma seek to destroy fragments of ''Innocence,'' the only weapons capable of harming the Earl and his army and bring about the Great Flood from a hundred years ago. To prevent this tragedy from happening, the Black Order was formed as an organization dedicated to fighting the Earl. They recruit Exorcists, those with the inherent ability to accommodate Innocence, to fight against the Akuma. In the late 19th century, Allen Walker—a white-haired boy armed with Innocence that takes the form of his entire left arm and a cursed eye that can see Akuma—is sent to the Black Order. There, Allen meets various comrades from the Order—the mercurial Yuu Kanda, the kindhearted Lenalee Lee, and the cheerful yet mysterious Lavi. Despite their different personalities, they have one goal in mind: to bring salvation to the souls of Akuma and prevent the Earl from destroying the world. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/240470l.jpg', 'Action, Adventure, Fantasy', NULL),
    ('Fullmetal Alchemist', 'Hiromu Arakawa', 'Alchemists are knowledgeable and naturally talented individuals who can manipulate and modify matter due to their art. Yet despite the wide range of possibilities, alchemy is not as all-powerful as most would believe. Human transmutation is strictly forbidden, and whoever attempts it risks severe consequences. Even so, siblings Edward and Alphonse Elric decide to ignore this great taboo and bring their mother back to life. Unfortunately, not only do they fail in resurrecting her, they also pay an extremely high price for their arrogance: Edward loses his left leg and Alphonse his entire body. Furthermore, Edward also gives up his right arm in order to seal his brother''s soul into a suit of armor. Years later, the young alchemists travel across the country looking for the Philosopher''s Stone, in the hopes of recovering their old bodies with its power. However, their quest for the fated stone also leads them to unravel far darker secrets than they could ever imagine. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/243675l.jpg', 'Action, Adventure, Award Winning, Drama, Fantasy', 'Military'),
    ('Hunter x Hunter', 'Yoshihiro Togashi', '''Secret treasure hoards, undiscovered wealth... mystical places, unexplored frontiers... ''The mysterious unknown.'' There''s magic in such words for those captivated by its spell. They are called ''Hunters''!'' Gon Freecss wants to become a Hunter so he can find his father, a man who abandoned him to pursue a life of adventure. But it''s not that simple: only one in one hundred thousand can pass the Hunter Exam, and that is just the first obstacle on his journey. During the Hunter Exam, Gon befriends many other potential Hunters, such as the mysterious Killua; the revenge-driven Kurapika; and Leorio, who aims to become a doctor. There''s a world of adventure and peril awaiting, and those who embrace it with open arms can become the greatest Hunters of them all! [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/2/253119l.jpg', 'Action, Adventure, Fantasy', NULL),
    ('X', 'CLAMP', 'Six years ago, Kamui Shirou and siblings Fuuma and Kotori Monou were inseparable childhood friends. After the sudden, gruesome death of the Monou siblings'' mother, Kamui was taken away from Tokyo by his own mother. In the years that passed, the two lived peacefully while Kamui strengthened his innate telekinetic abilities. When his mother passes away in 1999, her dying wish prompts him to return to Tokyo to face his ''destiny.'' When Kamui reappears in the city, his attitude has taken a drastic turn, and he displays the growth of his powers through violent confrontations in the streets. Various opponents come after him asking if he is ''Kamui,'' but they seem to be demanding something far more significant than his name. These fighters represent two opposite factions—the Dragons of Heaven and the Dragons of Earth—who each wish to recruit him to their cause. Piecing together clues about the apocalyptic ''promised day,'' Kamui realizes that he holds the fate of the world in his hands. Depending on which group of Dragons he allies himself with, he can either choose to save the world—or end it. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/2/267781l.jpg', 'Action, Drama, Fantasy, Supernatural', 'Psychological, Super Power'),
    ('Monster', 'Naoki Urasawa', 'Kenzou Tenma, a renowned Japanese neurosurgeon working in post-war Germany, faces a difficult choice: to operate on Johan Liebert, an orphan boy on the verge of death, or on the mayor of Düsseldorf. In the end, Tenma decides to gamble his reputation by saving Johan, effectively leaving the mayor for dead. As a consequence of his actions, hospital director Heinemann strips Tenma of his position, and Heinemann''s daughter Eva breaks off their engagement. Disgraced and shunned by his colleagues, Tenma loses all hope of a successful career—that is, until the mysterious killing of Heinemann gives him another chance. Nine years later, Tenma is the head of the surgical department and close to becoming the director himself. Although all seems well for him at first, he soon becomes entangled in a chain of gruesome murders that have taken place throughout Germany. The culprit is a monster—the same one that Tenma saved on that fateful day nine years ago. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/258224l.jpg', 'Award Winning, Drama, Mystery', 'Adult Cast, Psychological'),
    ('Berserk', 'Kentarou Miura', 'Guts, a former mercenary now known as the "Black Swordsman," is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings. Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity. [Written by MAL Rewrite] Included one-shot: Volume 14: Berserk: The Prototype', 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg', 'Action, Adventure, Award Winning, Drama, Fantasy, Horror, Supernatural', 'Gore, Military, Mythology, Psychological'),
    ('20th Century Boys', 'Naoki Urasawa', 'As the 20th century approaches its end, people all over the world are anxious that the world is changing. And probably not for the better. Kenji Endo is a normal convenience store manager who''s just trying to get by. But when he learns that one of his old friends going by the name "Donkey" has suddenly committed suicide, and that a new cult led by a figure known as "Friend" is becoming more notorious, Kenji starts to feel that something isn''t right. With a few key clues left behind by his deceased friend, Kenji realizes that this cult is much more than he ever thought it would be—not only is this mysterious organization directly targeting him and his childhood friends, but the whole world also faces a grave danger that only the friends have the key to stop. Kenji''s simple life of barely making ends meet is flipped upside down when he reunites with his childhood friends, and together they must figure out the truth of how their past is connected to the cult, as the turn of the century could mean the possible end of the world. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/5/260006l.jpg', 'Award Winning, Drama, Mystery, Sci-Fi', 'Historical, Psychological'),
    ('Yokohama Kaidashi Kikou', 'Hitoshi Ashinano', 'In a post-apocalyptic world where an environmental disaster led to the eruption of Mt. Fuji and the inundation of Yokohama, the age of humans is in its twilight. Alpha Hatsuseno is an android and the namesake of a small cafe outside Yokohama. As her owner is away on a trip indefinitely, she has been left responsible for running the cafe. Although she rarely gets any customers, Alpha remains outgoing and cheerful. While Alpha awaits her owner''s homecoming, she explores the vicinity with her scooter and camera. Throughout her journeys, she meets new people and other androids, making memories along the way. Yokohama Kaidashi Kikou is a beautiful, laid-back story centered around Alpha''s daily activities, emphasizing the passing of time in everyday life. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/171813l.jpg', 'Award Winning, Drama, Sci-Fi, Slice of Life', 'Iyashikei'),
    ('Hajime no Ippo', 'George Morikawa', 'Makunouchi Ippo is a 16-year-old high school student who helps his mother run the family business. His hefty workload impedes on his social life, making him an easy target for bullies. One day, while being beaten up by a group of high school students, Ippo is saved by a boxer named Mamoru Takamura, and is brought to the Kamogawa Boxing Gym. This afterschool bullying session turns his life around for the better as Ippo discovers his latent talent for boxing and decides to practice the sport professionally. However, Mamoru doubts Ippo''s determination and assigns him a task deemed impossible to complete, but the resolute Ippo trains tirelessly to fulfill his mission. Along the way, he finds out what it means to attain true strength while making new friends and fighting formidable foes. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/2/250313l.jpg', 'Award Winning, Sports', 'Combat Sports'),
    ('Full Moon wo Sagashite', 'Arina Tanemura', 'At the tender age of 12, Mitsuki Kouyama has a sarcoma in her throat. Though this rare cancer can be cured by removing her vocal cords, Mitsuki refuses because of her desire to become a pop singer and keep her childhood promise to Eichi Sakurai, her first love who left for America. Unable to both heal and keep her voice, she allows her health to deteriorate, as she accepts her tragic fate. One day, while escaping the home of her music-hating grandmother to attend an audition, Mitsuki meets two shinigami, Takuto Kira and Meroko Yui. Realizing that Mitsuki can see them, Takuto and Meroko reveal to her that she will die in a year. Moved by her plight, Takuto allows Mitsuki the chance to pursue her dream by giving her the ability to transform into a healthy sixteen-year-old girl. After being chosen for a contract with Seed Records, Mitsuki makes her debut under the stage name Full Moon and chooses to pursue her dream music career before her life''s end. [Written by MAL Rewrite] Included one-shot: Volume 2: Ginyuu Meika', 'https://cdn.myanimelist.net/images/manga/3/175970l.jpg', 'Comedy, Drama, Fantasy, Romance, Supernatural', 'Music, Showbiz'),
    ('Tsubasa: RESERVoir CHRoNiCLE', 'CLAMP', 'Warmhearted Syaoran has always been friends with Sakura—the princess of the Clow Kingdom who holds an extraordinary power capable of changing the world. When a mysterious man attempts to monopolize Sakura''s ability, her memories scatter throughout different worlds in the form of feathers. To save Sakura, Syaoran seeks help from the Dimensional Witch and meets two other travelers—Kurogane and Fai D. Flourite. Kurogane, a capable fighter and ninja, has been banished from his homeworld and wishes to return. In contrast, Fai, a magician from Celes, wants to traverse different worlds to avoid his home and past. As the price to cross dimensions, each of the three must sacrifice their most valued possession. For Sakura''s sake, Syaoran agrees to give away their relationship as payment to the Dimensional Witch. And with firm determination, Syaoran, Kurogane, and Fai begin journeying through numerous worlds to fight against their ill-fated destinies. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/272410l.jpg', 'Action, Adventure, Drama, Fantasy', NULL),
    ('xxxHOLiC', 'CLAMP', 'Living alone after his parents passed away, Kimihiro Watanuki is a high school student who can see otherworldly creatures that are attracted to him. His days are plagued by these nuisances, and he wishes to rid himself of this inconvenience. One fateful day, as Kimihiro is being chased by a horde of spirits, his feet bring him into a mysterious store to seek shelter. Here he meets Yuuko Ichihara, the mistress of this supposed store, who claims to be able to grant wishes. Yuuko offers to grant Kimihiro''s, as long as he pays an appropriate price. Thus begins Kimihiro''s time working in her store to earn the payment necessary for his wish. In Yuuko''s employ, he must become further involved with spirits and the supernatural before he can leave that world behind. How will he fare in the inexplicable encounters that await him? [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/217533l.jpg', 'Comedy, Drama, Mystery, Supernatural', NULL),
    ('Naruto', 'Masashi Kishimoto', 'Whenever Naruto Uzumaki proclaims that he will someday become the Hokage—a title bestowed upon the best ninja in the Village Hidden in the Leaves—no one takes him seriously. Since birth, Naruto has been shunned and ridiculed by his fellow villagers. But their contempt isn''t because Naruto is loud-mouthed, mischievous, or because of his ineptitude in the ninja arts, but because there is a demon inside him. Prior to Naruto''s birth, the powerful and deadly Nine-Tailed Fox attacked the village. In order to stop the rampage, the Fourth Hokage sacrificed his life to seal the demon inside the body of the newborn Naruto. And so when he is assigned to Team 7—along with his new teammates Sasuke Uchiha and Sakura Haruno, under the mentorship of veteran ninja Kakashi Hatake—Naruto is forced to work together with other people for the first time in his life. Through undergoing vigorous training and taking on challenging missions, Naruto must learn what it means to work in a team and carve his own route toward becoming a full-fledged ninja recognized by his village. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/249658l.jpg', 'Action, Adventure, Fantasy', 'Martial Arts'),
    ('Bleach', 'Tite Kubo', 'For as long as he can remember, high school student Ichigo Kurosaki has been able to see the spirits of the dead, but that has not stopped him from leading an ordinary life. One day, Ichigo returns home to find an intruder in his room who introduces herself as Rukia Kuchiki, a Soul Reaper tasked with helping souls pass over. Suddenly, the two are jolted from their conversation when a Hollow—an evil spirit known for consuming souls—attacks. As Ichigo makes a brash attempt to stop the Hollow, Rukia steps in and shields him from a counterattack. Injured and unable to keep fighting, Rukia suggests a risky plan—transfer half of her Soul Reaper powers to Ichigo. He accepts and, to Rukia''s surprise, ends up absorbing her powers entirely, allowing him to easily dispatch the Hollow. Now a Soul Reaper himself, Ichigo must take up Rukia''s duties of exterminating Hollows and protecting spirits, both living and dead. Along with his friends Orihime Inoue and Yasutora Sado—who later discover spiritual abilities of their own—Ichigo soon learns that the consequences of becoming a Soul Reaper and dealing with the world of spirits are far greater than he ever imagined. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/180031l.jpg', 'Action, Adventure, Award Winning, Fantasy', NULL),
    ('One Piece', 'Eiichiro Oda', 'Gol D. Roger, a man referred to as the "King of the Pirates," is set to be executed by the World Government. But just before his demise, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Announcing that One Piece can be claimed by anyone worthy enough to reach it, the King of the Pirates is executed and the Great Age of Pirates begins. Twenty-two years later, a young man by the name of Monkey D. Luffy is ready to embark on his own adventure, searching for One Piece and striving to become the new King of the Pirates. Armed with just a straw hat, a small boat, and an elastic body, he sets out on a fantastic journey to gather his own crew and a worthy ship that will take them across the Grand Line to claim the greatest status on the high seas. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg', 'Action, Adventure, Fantasy', NULL),
    ('Rave', 'Hiro Mashima', 'Fifty years ago, the wielders of the sacred Rave stones fought against an onslaught caused by demon stones called Dark Bring. This war resulted in an explosion known as "Overdrive"—a blast so powerful that it sent the Dark Bring into a deep slumber and scattered the pieces of Rave across the world. In the present, Haru Glory lives a peaceful life on Garage Island until one day, he catches the creature Plue while fishing. Plue is later recognized by Shiba Roses, an old man who happens to be the original Rave Master. Shiba explains that the Dark Bring has resurfaced, and that to stop it, assembling the scattered parts of Rave is of utmost urgency. However, before Shiba can leave on this mission, he is attacked by a soldier from the evil organization Demon Card, forcing him to transfer the power of Rave to Haru. With the fate of humankind resting on his shoulders, the new Rave Master begins his quest to find the scattered Rave fragments. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/3/255624l.jpg', 'Adventure, Comedy, Fantasy', NULL),
    ('Mahou Sensei Negima!', 'Ken Akamatsu', 'Negi Springfield, a 10-year-old wizard who recently graduated from Merdiana Magic Academy in Wales, hopes to achieve two things—to find his missing father, who was once known as the Thousand Master, and to become a Magister Magi, someone who helps the everyday world through magic. To reach his latter goal, he is assigned one last task: to teach English at a middle school in Japan. Much to his surprise and dismay, he not only discovers that his homeroom class consists of 31 girls, but also ends up revealing his true identity as a magician to Asuna Kagurazaka, one of his new students. Negi must now negotiate with the girl and face his most difficult challenge yet—to keep his identity a secret as he tackles magical threats both from within and outside of Mahora Academy, all the while keeping a watchful eye out for his lost father. [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/259286l.jpg', 'Action, Adventure, Comedy, Fantasy, Romance, Supernatural, Ecchi', 'Harem, Martial Arts, School'),
    ('Love Hina', 'Ken Akamatsu', 'It is said that if a couple gets into the University of Tokyo together, they will live happily ever after. However, for Keitarou Urashima, UTokyo is a distant dream. After failing the entrance exams twice already, he decides to stay at his grandmother''s inn in Tokyo in order to prepare for his third attempt. He is, therefore, surprised when he finds out that not only has his grandmother gone on a long vacation, but the inn has also become the Hinata House, an all-girls dormitory! Unfortunately for Keitarou, a series of misunderstandings during his first visit leave him with five untrusting tenants. But when Haruka Urashima, his aunt who works at the dorm, brings up that he is supposedly a UTokyo student, the girls'' impressions of him quickly change, and they reluctantly allow him to stay. Feeling guilty about the lie, he slowly gets to know his new neighbors: the cute yet violent Naru Narusegawa, the cheeky and opportunistic Mitsune Konno, the soft-spoken Shinobu Maehara, the straight-laced Motoko Aoyama, and the mischievous Kaolla Su. Thus continues the unpopular Keitarou''s difficult journey to get into UTokyo, all for the chance to fulfill his childhood promise to the only girl who has ever shown any interest in him and maybe, just maybe, meet her again... [Written by MAL Rewrite]', 'https://cdn.myanimelist.net/images/manga/1/259287l.jpg', 'Award Winning, Comedy, Romance, Ecchi', 'Harem'),
    ('Kareshi Kanojo no Jijou', 'Masami Tsuda', 'Yukino Miyazawa is the perfect model student. Pretty, kind, good at sports, always at the top of her class. But she''s not all that she seems. It''s all an act of deception; she is really the self-confessed "queen of vanity," and her only goal in life is winning the praise and admiration of everyone around her. When she enters high school, she finally meets her match: Souichirou Arima, a handsome, athletic, popular, and very intelligent young boy. Ever since he stole the top seat in the class from her, Yukino has hated him, and has been plotting on how to take back her former place as the object of all other students'' admiration. What she wasn''t expecting, however, was that Souichirou, the very boy she hated, would confess his love for her. Or that he would find out about her deception—and use it to blackmail her! Together, they discover that they have more in common than they knew, and they slowly begin to bring out each other''s inner selves. (Source: MU) Included one-shots: Volume 1: Tora to Chameleon: Yakusoku wa Isshukan (The Tiger and the Chameleon: A Promise for One Week) Volume 4: Ashita Mata Mori de Aou ne (Meet Me Again Tomorrow in the Forest) Volume 8: Abareru Ousama (The Raging King)', 'https://cdn.myanimelist.net/images/manga/1/267780l.jpg', 'Comedy, Drama, Romance', 'School'),
    ('Kodomo no Omocha', 'Miho Obana', 'Sana Kurata, a child actress, faces many problems in her classroom, including a major one - her bullying classmate, Akito Hayama. Sana''s outgoing and friendly nature leads her to work towards correcting all of the problems around her. Her ''meddling'' irritates Hayama but at the same time captivates him, just as Hayama''s gloomy nature irritates Sana and compels her to change him. As these two opposites attract each other, they face many hardships which bring them closer to a mutual understanding. (Source: ANN)', 'https://cdn.myanimelist.net/images/manga/1/267715l.jpg', 'Award Winning, Comedy, Drama, Romance, Slice of Life', 'Love Polygon, School, Showbiz');

-- Insert entries into the user_library table
INSERT INTO user_library (user_id, manga_id, status) VALUES
(1, 1, 'Plan to Read'),
(1, 2, 'Reading'),
(2, 1, 'Finished'),
(2, 3, 'Dropped'),
(3, 2, 'Reading'),
(3, 4, 'Finished'),
(4, 5, 'Plan to Read'),
(4, 6, 'Reading'),
(5, 7, 'Dropped'),
(5, 8, 'Finished');

--Read All users
SELECT username, email, password, isadmin, islogged
FROM users

--Read user by email
SELECT username, email, password, isadmin, islogged
FROM users
WHERE email='charlie.black@example.com'

--Read All mangas
SELECT title, author, synopsis, cover_image_url, genres, themes
FROM manga

--Read All libraries INNER JOIN users AND manga
SELECT u.username, u.email, m.title, l.status
FROM user_library AS L
INNER JOIN users AS u
ON u.user_id = l.user_id
INNER JOIN manga AS m
ON m.manga_id = l.manga_id 

--Read all manga entries by user's email
SELECT l.*, u.email, m.title
FROM user_library as l
INNER JOIN users AS u
ON l.user_id = u.user_id
INNER JOIN manga AS m
ON m.manga_id = l.manga_id
WHERE u.email = 'charlie.black@example.com'

-- Get all mangas with 'Reading' status
SELECT u.username, u.email, m.title, l.status
FROM user_library AS l
INNER JOIN users AS u ON u.user_id = l.user_id
INNER JOIN manga AS m ON m.manga_id = l.manga_id
WHERE l.status = 'Reading';

-- Get all mangas with 'Dropped' status
SELECT u.username, u.email, m.title, l.status
FROM user_library AS l
INNER JOIN users AS u ON u.user_id = l.user_id
INNER JOIN manga AS m ON m.manga_id = l.manga_id
WHERE l.status = 'Dropped';

-- Get all mangas with 'Finished' status
SELECT u.username, u.email, m.title, l.status
FROM user_library AS l
INNER JOIN users AS u ON u.user_id = l.user_id
INNER JOIN manga AS m ON m.manga_id = l.manga_id
WHERE l.status = 'Finished';

-- Get all mangas with 'Plan to Read' status
SELECT u.username, u.email, m.title, l.status
FROM user_library AS l
INNER JOIN users AS u ON u.user_id = l.user_id
INNER JOIN manga AS m ON m.manga_id = l.manga_id
WHERE l.status = 'Plan to Read';

-- Create a new user
INSERT INTO public.users( username, email, password, isadmin, islogged )
	VALUES (
	'Jonás',
	'jonasmail@mail.com',
	'jonaspassword',
	FALSE,
	FALSE
	);

--Create a new manga
INSERT INTO manga (title, author, synopsis, cover_image_url, genres, themes)
VALUES (
    'Example Manga Title',
    'Jane Doe',
    'This is a synopsis of the example manga. It tells the story of a hero on a great adventure.',
    'https://example.com/images/manga/example.jpg',
    'Action, Adventure, Fantasy',
    'Heroic Journey, Mythology'
);

--Create a new library entry
INSERT INTO user_library (user_id, manga_id, status)
VALUES ((SELECT user_id FROM users WHERE email='jonasmail@mail.com'), (SELECT manga_id FROM manga WHERE title='Hunter x Hunter'), 'Reading');

--Update a user
UPDATE users
SET 
    username = 'new_username',
    password = 'new_password', 
    isadmin = false,           
    islogged = false           
WHERE 
    email = 'charlie.black@example.com';

--Toggle logged status
UPDATE users
SET islogged = true
WHERE email = 'charlie.black@example.com'
RETURNING *;

UPDATE users
SET islogged = false
WHERE email = 'charlie.black@example.com'
RETURNING *;

--Update the manga information
UPDATE manga
SET 
    synopsis = 'This is the updated synopsis of the example manga. The hero continues their adventure with new challenges.',
    cover_image_url = 'https://example.com/images/manga/updated_example.jpg',
    genres = 'Action, Adventure, Drama',
    themes = 'Heroic Journey, Mythology, Friendship'
WHERE 
    title = 'Example Manga Title';  

--Update status of a manga entry
UPDATE user_library
SET status = 'Finished'
WHERE user_id = (SELECT user_id FROM users WHERE email = 'jonasmail@mail.com')
AND manga_id = (SELECT manga_id FROM manga WHERE title = 'Hunter x Hunter');

--Delete the user by email
DELETE FROM users
WHERE 
    email = 'exampleuser@example.com';

--Delete the manga
DELETE FROM manga
WHERE 
    title = 'Example Manga Title';

--Delete manga entry from user's library
DELETE FROM user_library
WHERE user_id = (SELECT user_id FROM users WHERE email = 'exampleuser@example.com')
AND manga_id = (SELECT manga_id FROM manga WHERE title = 'Example Manga Title');