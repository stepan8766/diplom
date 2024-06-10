from aiogram.fsm.state import default_state, State, StatesGroup

class CurrentState(StatesGroup):

	first_start = State()
	write_country = State()