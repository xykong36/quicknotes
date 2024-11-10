import React from "react";
import { Card } from "antd";
import PhraseExplanation from "./PhraseExplanation";

const phrases = [
  {
    en: "compelling ideas",
    cn: "引人注目的想法",
    color: "text-blue-600",
  },
  {
    en: "new innovations",
    cn: "新的创新",
    color: "text-green-600",
  },
  {
    en: "vexing problems",
    cn: "棘手的问题",
    color: "text-red-600",
  },
  {
    en: "TED stage",
    cn: "TED 舞台",
    color: "text-purple-600",
  },
  {
    en: "vampires",
    cn: "吸血鬼",
    color: "text-yellow-600",
  },
  {
    en: "cast reflections",
    cn: "投射倒影",
    color: "text-orange-600",
  },
  {
    en: "suspicious",
    cn: "怀疑的",
    color: "text-teal-600",
  },
  {
    en: "undead creature",
    cn: "不死生物",
    color: "text-gray-600",
  },
  {
    en: "bright lights",
    cn: "明亮的灯光",
    color: "text-indigo-600",
  },
  {
    en: "aggressive behavior",
    cn: "攻击性行为",
    color: "text-pink-600",
  },
  {
    en: "fear of the unknown",
    cn: "对未知的恐惧",
    color: "text-blue-700",
  },
  {
    en: "rabies outbreak",
    cn: "狂犬病爆发",
    color: "text-red-700",
  },
  {
    en: "vampire movies",
    cn: "吸血鬼电影",
    color: "text-orange-700",
  },
  {
    en: "ultimate villain",
    cn: "终极反派",
    color: "text-teal-700",
  },
  {
    en: "iconic",
    cn: "标志性的",
    color: "text-green-700",
  },
  {
    en: "unchecked power",
    cn: "不受约束的权力",
    color: "text-purple-700",
  },
  {
    en: "supernatural",
    cn: "超自然",
    color: "text-yellow-700",
  },
  {
    en: "reflection of us",
    cn: "我们的映像",
    color: "text-gray-700",
  },
  {
    en: "unity",
    cn: "团结",
    color: "text-pink-700",
  },
  {
    en: "vampire rainbow",
    cn: "吸血鬼的彩虹",
    color: "text-blue-800",
  },
  {
    en: "kung fu master",
    cn: "功夫大师",
    color: "text-green-800",
  },
  {
    en: "human contracts",
    cn: "人体感染",
    color: "text-orange-800",
  },
  {
    en: "ultimate villain",
    cn: "终极反派",
    color: "text-purple-800",
  },
  {
    en: "concept of unity",
    cn: "团结的概念",
    color: "text-yellow-800",
  },
  {
    en: "save humanity",
    cn: "拯救人类",
    color: "text-red-800",
  },
];

const phrases2 = [
  {
    en: "blood flow",
    cn: "促进血液循环",
    color: "text-blue-600",
  },
  {
    en: "do over and over",
    cn: "反复这样做",
    color: "text-green-600",
  },
  {
    en: "consistency",
    cn: "一直做下去",
    color: "text-purple-600",
  },
  {
    en: "build self-confidence",
    cn: "建立自信",
    color: "text-blue-600",
  },
  {
    en: "When it comes to",
    cn: "说到",
    color: "text-orange-600",
  },
  {
    en: "present ourselves to others",
    cn: "给他人的印象",
    color: "text-teal-600",
  },
  {
    en: "self-esteem",
    cn: "自尊",
    color: "text-indigo-600",
  },
  {
    en: "accomplishing",
    cn: "完成",
    color: "text-rose-600",
  },
  {
    en: "keeping yourself accountable",
    cn: "保持自律",
    color: "text-emerald-600",
  },
];

const phrases1 = [
  {
    en: "compelling ideas",
    cn: "引人注目的想法",
    color: "text-blue-600",
  },
  {
    en: "innovative solutions",
    cn: "创新解决方案",
    color: "text-green-600",
  },
  {
    en: "vexing problems",
    cn: "棘手的问题",
    color: "text-purple-600",
  },
  {
    en: "explore with you",
    cn: "和你一起探讨",
    color: "text-blue-600",
  },
  {
    en: "moment of confrontation",
    cn: "对峙的时刻",
    color: "text-green-600",
  },
  {
    en: "in fact",
    cn: "实际上",
    color: "text-purple-600",
  },
  {
    en: "keep in mind",
    cn: "记住",
    color: "text-blue-600",
  },
  {
    en: "change over time",
    cn: "随时间而变化",
    color: "text-green-600",
  },
];

// const paragraphs = {
//   english: {
//     text: "When you take a cold shower it immediately get that blood flow going. It will give you immediately energy and if this is something you will do over and over. It becomes a habit for you. It will become consistency and again this is where you build self-confidence and where you're actually really starting to feel yourself. When it comes to self confidence I feel that's something very often we try to find from our external world right. What other people think of us, how we present ourselves to others, But at the end your self-esteem comes from within. Almost having these little mini challenges for yourself and just accomplishing them and like doing them and keeping yourself accountable. That is where you're going to build self-confidence.",
//   },
//   chinese: {
//     text: "当你洗冷水澡时，立刻促进血液循环，会让你瞬间充满能量。如果你反复这样做，它就会逐渐变成一种习惯。这会让你一直做下去，这也是建立自信的来源，你也开始真正去了解自己。说到自信，我们往往试图从外界寻找自信，比如别人对我们的看法、我们给他人的印象。但最终，自信是来自内心的。给自己设定一些小目标，努力完成它们，享受挑战的过程，并时刻保持自律，这才是建立自信的关键。",
//   },
// };

const paragraphs = {
  english: {
    text: "We're here today to hear compelling ideas, new innovations and thinking in science and medicine. And innovative solutions to our most vexing problems in society. So they said to me, \"Eric, do you have anything that you can add to this compelling list of stories and ideas? Something you can talk about here on the TED stage?\" And I said, \"Of course I do.\" And the question I want to explore with you today is: Why don’t vampires cast reflections in mirrors? So, you've probably seen this before in movies. The humans are suspicious of the new dark stranger, and they band together in this moment of confrontation, and they open up a mirror in front of them and bam -- there’s no reflection there. Proving to the humans that the new dark stranger is, in fact, a vampire. That's right. So where did this start? How did this happen? This idea that you could hold a mirror up to an undead creature and learn that they are a vampire? Well, we're going to find that out. The thing you have to keep in mind is, as we look through the history of vampires, that they change over time. Every culture in history has had a variation on a vampire. Every single one. Very few of them use -- Are you laughing at some of these illustrations? Maybe you are. I did sneak one in there. So they don't always call them vampires. But every culture has a version of a supernatural creature who comes back from the dead and gains power by preying on the living. Our version of the vampire really came about in the 16th century. It was a way to conveniently explain some misunderstandings about death and dying. Some sketchy activity happens in the village. Someone gets an idea, \"Hey, let's dig up Wolfgang.\" And they opened his coffin, and they find that his hair and his fingernails and his teeth have all seemed to grow since he died. And they see some fluid around his mouth which they mistakenly think is blood. Proof that Wolfgang is a vampire. But this is actually what happens to a body when it's decomposing. Not that they're undead. Our understanding of vampires really exploded, or our lexicon for vampires really exploded in the 18th century after a rabies outbreak in Hungary and Romania. Now, the thing to remember is that when a human contracts rabies, it can take a couple weeks before symptoms start to manifest. So some really common vampire characteristics, like an avoidance of bright lights or strong smells like garlic, an aversion to water and suddenly aggressive behavior are not signs of the undead. They are signs of rabies. But back then, they couldn't put those things together. They didn't think that the neighbor who's acting funny now, it wasn't because of the raccoon that bit them two weeks ago. It's because now a much more logical explanation is that they are, in fact, a vampire. So most of our ideas of vampires that we all think of came about in the movies. Count Dracula and Sherlock Holmes have been in a decades-long battle to be the most depicted fictional character in film. It goes back and forth every couple of years. But when we think of the vampire in film, there are some things that are quite iconic to us, like \"Nosferatu,\" right? Here's a fun fact for you about \"Nosferatu.\" Outside of that, most people get something wrong, they think it's the first vampire movie.",
  },
  chinese: {
    text: '今天我们在这里是为了听取引人注目的想法、新的创新以及科学和医学领域的新思维。还有针对社会中最棘手问题的创新解决方案。所以他们问我，"Eric，你有什么可以加入到这个引人注目的故事和想法清单中的内容吗？有什么可以在TED舞台上分享的吗？" 我回答说，"当然有。" 今天我想和你们探讨的问题是：为什么吸血鬼不会在镜子中投射倒影？也许你在电影中见过这种情节。人类对那个新出现的神秘黑衣人产生了怀疑，于是他们团结起来，在对峙的时刻，拿出一面镜子，哗——没有倒影！这证明了那位神秘黑衣人确实是吸血鬼。没错。那么这种想法是从哪里开始的？这种现象是怎么发生的？这个观点，即可以通过将镜子对着不死生物来确定其是吸血鬼的想法，是怎么出现的？我们接下来会探讨这个问题。你需要记住的一点是，随着我们回顾吸血鬼的历史，吸血鬼的形象在不断变化。历史上的每种文化都有一种吸血鬼的变体。每一种都有。你是不是在笑这些插图？可能是吧，我悄悄放了一幅进去。所以他们并不总是称之为吸血鬼。但每种文化都有一种从死而复生并通过猎食活人来获得力量的超自然生物。我们所熟知的吸血鬼形象实际上在16世纪逐渐成型，那是一种便于解释关于死亡和死亡的误解的方式。村庄里发生了一些可疑的事情。有人想到一个主意，"嘿，我们来挖掘一下沃尔夫冈吧。" 他们打开了他的棺材，发现他的头发、指甲和牙齿似乎在死后仍在生长。他们还在他的嘴周围看到了某些液体，误认为是血。这成了沃尔夫冈是吸血鬼的证据。其实这只是尸体腐烂时的自然现象，并不是不死生物。我们对吸血鬼的理解，或者说我们对吸血鬼的词汇库在18世纪匈牙利和罗马尼亚爆发狂犬病后得到了极大的丰富。现在要记住的是，当一个人感染了狂犬病时，症状可能要几周后才会显现。所以一些常见的吸血鬼特征，比如对亮光或大蒜等强烈气味的厌恶，对水的抗拒和突然的攻击性行为，都不是不死生物的特征，而是狂犬病的症状。但当时他们并没有把这些现象联系起来。他们并没有想到，现在行为怪异的邻居是因为两周前被浣熊咬伤，而是更容易接受一个解释，那就是他们是吸血鬼。我们大多数关于吸血鬼的想法都来自电影。德古拉伯爵和福尔摩斯在几十年间争夺电影中被描绘最多的虚构角色。每隔几年轮流一次。但当我们想到电影中的吸血鬼时，有一些标志性的东西，比如《诺斯费拉图》，对吧？关于《诺斯费拉图》有个有趣的事实。大多数人都误以为这是第一部吸血鬼电影。',
  },
};

// const paragraphs = {
//   english: {
//     text: "We're here today to hear compelling ideas, new innovations and thinking\nin science and medicine. And innovative solutions to our most\nvexing problems in society. So they said to me, \"Eric, do you have anything\nthat you can add to this compelling list\nof stories and ideas? Something you can talk about\nhere on the TED stage?\" And I said, \"Of course I do.\" And the question I want\nto explore with you today is: Why don’t vampires\ncast reflections in mirrors? So, you've probably seen\nthis before in movies. The humans are suspicious\nof the new dark stranger, and they band together\nin this moment of confrontation, and they open up a mirror\nin front of them and bam -- there’s no reflection there. Proving to the humans\nthat the new dark stranger is, in fact, a vampire. That's right. So where did this start? How did this happen? This idea that you could hold a mirror\nup to an undead creature and learn that they are a vampire? Well, we're going to find that out. The thing you have to keep in mind is, as we look through\nthe history of vampires, that they change over time. Every culture in history\nhas had a variation on a vampire. Every single one.",
//   },
//   chinese: {
//     text: "今天我们聚集在这里，聆听科学和医学领域中的引人注目的想法、新的创新和思维模式，以及对社会中棘手问题的创新解决方案。于是他们问我，“Eric，你有什么可以加入到这个引人注目的故事和思想清单中的吗？你可以在TED舞台上谈论的内容是什么？”我回答道，“当然有。”我今天想和大家探讨的问题是：为什么吸血鬼在镜子中不会有倒影？你可能在电影中见过这种情景。人类对这个神秘的陌生人产生怀疑，于是他们团结起来，在这个对峙的时刻，拿起镜子放在他面前，然后——没有倒影！这就证明了这个神秘的陌生人实际上是一个吸血鬼。没错。那么这到底是从哪里开始的？是如何产生的？这个拿起镜子对着不死生物，从而识别他们是吸血鬼的想法是怎么来的？好吧，我们将要弄清楚这一点。你需要记住的是，当我们回顾吸血鬼的历史时，他们的形象会随时间而改变。历史上的每个文化都有一个关于吸血鬼的变体。每一个文化都是如此。",
//   },
// };

const HighlightedParagraph = ({ text, language }) => {
  // 创建一个数组来存储所有标记位置
  const markPositions = [];

  // 首先收集所有需要高亮的位置
  phrases.forEach((phrase, phraseIndex) => {
    const phraseText = language === "en" ? phrase.en : phrase.cn;
    let position = 0;

    while (true) {
      const index = text.indexOf(phraseText, position);
      if (index === -1) break;

      markPositions.push({
        start: index,
        end: index + phraseText.length,
        color: phrase.color,
        text: phraseText,
        priority: phraseIndex, // 使用数组索引作为优先级
      });

      position = index + 1; // 移动到下一个可能的位置
    }
  });

  // 按开始位置排序
  markPositions.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.priority - b.priority; // 如果开始位置相同，使用优先级排序
  });

  // 合并重叠的区间
  const mergedPositions = [];
  for (const pos of markPositions) {
    if (mergedPositions.length === 0) {
      mergedPositions.push(pos);
      continue;
    }

    const last = mergedPositions[mergedPositions.length - 1];
    if (pos.start < last.end) {
      // 如果当前区间的优先级更高，则使用当前区间
      if (pos.priority < last.priority) {
        mergedPositions[mergedPositions.length - 1] = pos;
      }
      // 否则保持原区间不变
    } else {
      mergedPositions.push(pos);
    }
  }

  // 生成spans
  let spans = [];
  let lastIndex = 0;

  mergedPositions.forEach((position, i) => {
    if (position.start > lastIndex) {
      spans.push(
        <span key={`text-${i}`}>
          {text.substring(lastIndex, position.start)}
        </span>
      );
    }

    spans.push(
      <span
        key={`highlight-${i}`}
        className={`${position.color} underline font-medium hover:opacity-80 cursor-pointer transition-opacity`}
        title="点击查看详情"
      >
        {position.text}
      </span>
    );

    lastIndex = position.end;
  });

  if (lastIndex < text.length) {
    spans.push(<span key="text-final">{text.substring(lastIndex)}</span>);
  }

  return <div className="leading-relaxed text-gray-800">{spans}</div>;
};

const BilingualParagraphComparison = () => {
  return (
    <Card className="w-full bg-white shadow-md">
      <div className="p-6 space-y-6">
        <HighlightedParagraph text={paragraphs.chinese.text} language="cn" />
        <div className="border-b border-gray-200" />
        <HighlightedParagraph text={paragraphs.english.text} language="en" />
        <div className="border-b border-gray-200" />
        <div className="p-6">
          <PhraseExplanation />
        </div>
      </div>
    </Card>
  );
};

const ParagraphPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <BilingualParagraphComparison />
      </div>
    </div>
  );
};

export default ParagraphPage;
