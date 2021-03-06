"""Removed unnecessary column. Restructured database.

Revision ID: 1c3def6d8234
Revises: 92e9847f9844
Create Date: 2021-07-21 19:02:30.136689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c3def6d8234'
down_revision = '92e9847f9844'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('racks', 'open_position')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('racks', sa.Column('open_position', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
