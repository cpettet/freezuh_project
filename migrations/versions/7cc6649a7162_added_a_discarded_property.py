"""Added a discarded property.

Revision ID: 7cc6649a7162
Revises: 73b3ceb08691
Create Date: 2021-07-06 09:11:55.271341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7cc6649a7162'
down_revision = '73b3ceb08691'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('racks', sa.Column('discarded', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('racks', 'discarded')
    # ### end Alembic commands ###