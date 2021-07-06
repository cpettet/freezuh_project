"""Fixed a column name

Revision ID: e1c8ccb09dcc
Revises: 1f01c8bae22d
Create Date: 2021-07-05 17:26:03.942240

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1c8ccb09dcc'
down_revision = '1f01c8bae22d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('plates', sa.Column('rack_position_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'plates', 'rack_positions', ['rack_position_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'plates', type_='foreignkey')
    op.drop_column('plates', 'rack_position_id')
    # ### end Alembic commands ###
