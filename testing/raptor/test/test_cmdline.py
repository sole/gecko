from __future__ import absolute_import, unicode_literals

import os
import pytest

import mozunit

from argparse import ArgumentParser, Namespace
from raptor.cmdline import verify_options


def test_verify_options(filedir):
    args = Namespace(app='firefox',
                     binary='invalid/path',
                     gecko_profile='False',
                     page_cycles=1,
                     page_timeout=60000)
    parser = ArgumentParser()

    with pytest.raises(SystemExit):
        verify_options(parser, args)

    args.binary = os.path.join(filedir, 'fake_binary.exe')
    verify_options(parser, args)  # assert no exception


if __name__ == '__main__':
    mozunit.main()
