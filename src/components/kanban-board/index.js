import React from "react";
import "./index.css"

const randID = ()=> Date.now()+Math.random() 

export default function KanbanBoard(props) { 


	let [tasks, setTasks] = React.useState([
		{ id: randID(),  name: '1', stage: 0 },
		{ id: randID(),  name: '2', stage: 0 },
	])

	let [stagesNames, setStagesNames] = React.useState(['Backlog', 'To Do', 'Ongoing', 'Done']);

	let inputTaskRef = React.createRef();

	
	var stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}
	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
	}

 	const handleCreate = (e)=>{
		e.preventDefault();
		let tasksCopy = [...tasks];
		tasksCopy.push({ id: randID(), name:inputTaskRef.current.value , stage: 0});
		setTasks(tasksCopy);
		inputTaskRef.current.value = "";
	}

	const handleDelete = (id)=>{
		const newTasks = tasks.filter((item, i) => item.id !== id)
		setTasks(newTasks);
	}
	const handleForward = (id)=>{
		let tasksCopy = [...tasks];
		tasksCopy = tasksCopy.map((item, i) => {
			if(item.id == id && item.stage < 3 ){
				item.stage = item.stage + 1;
			}
			return item;
		});
		console.log(tasksCopy);

		return setTasks(tasksCopy);
	}
	
	const handleBackword = (id)=>{
		let tasksCopy = [...tasks];
		tasksCopy = tasksCopy.map((item, i) => {
			if(item.id == id && item.stage > 0 ){
				item.stage = item.stage - 1;
			}
			return item;
		});
		console.log(tasksCopy);
		return setTasks(tasksCopy);

	}

	
	let disableForwardClass , disableBackwardClass = "";
	return (
		<div className="mt-20 layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
			<form className="form-signin" onSubmit={handleCreate}>
				<input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" ref={inputTaskRef} />
				<button type="submit" className="ml-30" data-testid="create-task-button" >Create task</button>
				</form>
			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button className="icon-only x-small mx-2  ${disableBackwardClass}" disabled={`${task.stage==0?"disabled":""}`} data-testid={`${task.name.split(' ').join('-')}-back`}
													onClick={() => handleBackword(task.id)} >
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2 `${disableForwardClass}`" disabled={`${task.stage==3?"disabled":""}`} data-testid={`${task.name.split(' ').join('-')}-forward`}
													onClick={() => handleForward(task.id)} >
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} 
													            onClick={() => handleDelete(task.id)}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}