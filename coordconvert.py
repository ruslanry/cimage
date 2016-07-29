def int_to_text(int_lat,int_lon):
    return int_to_lat(int_lat),int_to_lon(int_lon)

def int_to_lat(int_lat):
    return _int_to_raw(int_lat,True)

def int_to_lon(int_lon):
    return _int_to_raw(int_lon,False)

def _int_to_raw(int_val,isLat):
    return None
