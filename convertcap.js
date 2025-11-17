const srtCap = `1
00:00:07,020 --> 00:00:14,820
I remember being born. They told
me it's not possible, but I do.

2
00:00:18,320 --> 00:00:23,780
I remember the darkness. It
hot, humid, quite

3
00:00:23,780 --> 00:00:24,740
claustrophobic.

4
00:00:26,280 --> 00:00:31,920
I remember feeling stuck. That
place was too small for me, even

5
00:00:31,920 --> 00:00:37,440
then I could feel that even
then, I knew greater things

6
00:00:37,440 --> 00:00:38,040
awaited.

7
00:00:40,620 --> 00:00:46,200
I remember hearing voices
outside, they were calling me,

8
00:00:46,500 --> 00:00:48,105
inviting me to break free.

9
00:00:48,105 --> 00:00:55,905
There was an urge deep inside my
bones to escape. To open my

10
00:00:55,905 --> 00:01:01,665
wings, to fly away towards the
light, towards infinity.

11
00:01:01,665 --> 00:01:05,385
The sky is the limit, they say.

12
00:01:05,385 --> 00:01:15,210
So I pushed. I hit that wall as
hard as I could, and then a

13
00:01:15,210 --> 00:01:21,810
little crack, and I saw it.
Freedom.
`

function srtToCues(srt) {
    const blocks = srt.trim().split(/\n\s*\n+/);
  
    return blocks.map(block => {
      const lines = block.split(/\n+/);
      const timeLine = lines[1].trim();
  
      // Ensure all commas in timestamps become decimal points
      const normalized = timeLine.replace(/,/g, "."); 
  
      const [startStr, endStr] = normalized.split(" --> ");
  
      const toSeconds = t => {
        const [h, m, s] = t.split(":").map(Number);
        return +(h * 3600 + m * 60 + s).toFixed(3);
      };
  
      const start = toSeconds(startStr);
      const end = toSeconds(endStr);
  
      const text = lines.slice(2).join(" ").replace(/\s+/g, " ").replace(/"/g, '\\"');
  
      return `[${start},${end},"${text}"]`;
    }).join(",\n");
  }
  
  // Example usage (paste an SRT string in place of `srtText`)
  console.log(srtToCues(srtCap));