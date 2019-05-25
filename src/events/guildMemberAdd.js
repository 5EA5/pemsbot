module.exports = (client, member) => {
client.db.set(member.id, client.config.users)

} 