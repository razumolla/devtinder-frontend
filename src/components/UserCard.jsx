const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, gender, age, skills } = user;
  console.log("user", user);
  return (
    <div>
      <div className="card card-compact bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user?.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>
            {skills &&
              skills.map((skill) => {
                return (
                  <span
                    key={skill}
                    className="bg-slate-500 mr-1 p-1 rounded-lg"
                  >
                    {skill}
                  </span>
                );
              })}
          </p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
