#!/usr/bin/env python3
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cimage.settings")
#    if (sys.version_info.major!=3):
#      print('****** THIS IS NOT Python3 *******************************')
#      quit()

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
