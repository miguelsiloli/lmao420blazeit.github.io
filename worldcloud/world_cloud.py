import pandas as pd
from wordcloud import WordCloud

with open('worldcloud/thesis_shuffle.txt', encoding="utf8") as f:
    lines = str(f.readlines())
    
print(lines)
    
worldcloud = WordCloud().generate(lines)
print(worldcloud)