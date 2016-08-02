from points.models import Point
import pickle

def get_wiki_data():
    with open('data.pickle', 'rb') as f:
      wiki_collected = pickle.load(f)
    
    print(wiki_collected[12])

    for i in range(len(wiki_collected)):
    #for i in range(20):
        print(i)
        try:
           new_point = Point()
           new_point.point_name  = wiki_collected[i]['name']
           new_point.point_lat   = wiki_collected[i]['latWeb']
           new_point.point_lon   = wiki_collected[i]['lonWeb']
           if 'image_link' in wiki_collected[i]:
               new_point.point_image = wiki_collected[i]['image_link']
           else:
              new_point.point_name = '* '+new_point.point_name
           if 'link' in wiki_collected[i]:
               new_point.point_link  = wiki_collected[i]['link']
           else:
              new_point.point_name = '* '+new_point.point_name
           new_point.save()
        except KeyError:
           print(i,'KeyError')

    return 'Collected {} row'.format(len(wiki_collected))


