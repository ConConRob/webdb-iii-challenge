exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "Tim", cohort_id: 1 },
        { id: 2, name: "Lim", cohort_id: 1 },
        { id: 3, name: "Jim", cohort_id: 2 },
        { id: 4, name: "Cim", cohort_id: 2 },
        { id: 5, name: "Sim", cohort_id: 2 },
        { id: 6, name: "Kim", cohort_id: 3 }
      ]);
    });
};
