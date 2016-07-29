# -*- coding: utf-8 -*-
def WebParse(coord):
    ret = {}
    base           = abs(coord)
    ret['minus']   = (coord<0)
    ret['degress'] = int(base // 1)
    ret['minute']  = round((base - ret['degress'])*60, 3)
    ret['mminute'] = int(ret['minute'])
    ret['msecond'] = int(round((ret['minute'] - ret['mminute'])*1000))
    ret['sminute'] = int(ret['minute'])
    ret['ssecond'] = int(round((ret['minute'] - ret['sminute'])*60))
    ret['coord']   = coord
    return ret

def getLatWGS84(coord):
    raw=WebParse(coord)
    raw['char'] = 'S' if raw['minus'] else 'N'
    if raw['degress']>90:
        return None
    else:
        return " {degress:02d} {mminute:02d}.{msecond:03d}'{char}".format(**raw)
    
def getLatSecWGS84(coord):
    raw=WebParse(coord)
    raw['char'] = 'S' if raw['minus'] else 'N'
    if raw['degress']>90:
        return None
    else:
        return """ {degress:02d} {sminute:02d}'{ssecond:02d}"{char}""".format(**raw)
    
def getLonWGS84(coord):
    raw=WebParse(coord)
    raw['char'] = 'W' if raw['minus'] else 'E'
    if raw['degress']>180:
        return None
    else:
        return "{degress:03d} {mminute:02d}.{msecond:03d}'{char}".format(**raw)
    
def getLonSecWGS84(coord):
    raw=WebParse(coord)
    raw['char'] = 'W' if raw['minus'] else 'E'
    if raw['degress']>180:
        return None
    else:
        return """{degress:03d} {sminute:02d}'{ssecond:02d}"{char}""".format(**raw)

def getWGS84(lat,lon):
    return {'lat':getLatWGS84(lat),'lon':getLonWGS84(lon)}


